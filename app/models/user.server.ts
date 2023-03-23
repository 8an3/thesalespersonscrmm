import bcrypt from "bcryptjs";

import { configUser } from "~/configs";
import { prisma } from "~/libs";
import { createNanoID, invariant } from "~/utils";

import type { UserPassword, User } from "@prisma/client";
export type { User } from "@prisma/client";

export const fields = {
  public: {
    id: true,
    name: true,
    username: true,
    role: { select: { symbol: true, name: true, description: true } },
  },
  private: {
    id: true,
    name: true,
    username: true,
    role: { select: { symbol: true, name: true, description: true } },
    email: true,
    phone: true,
    profile: true,
    notes: true,
  },
};

export const query = {
  count() {
    return prisma.user.count();
  },
  getAllUsernames() {
    return prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });
  },
  getForSession({ id }: Pick<User, "id">) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: { select: { symbol: true, name: true } },
        profile: {
          select: {
            headline: true,
            bio: true,
          },
        },
      },
    });
  },
  getById({ id }: Pick<User, "id">) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
        profile: true,
        notes: true,
      },
    });
  },
  getByUsername({ username }: Pick<User, "username">) {
    return prisma.user.findUnique({
      where: { username },
      include: {
        role: true,
        profile: true,
        notes: true,
      },
    });
  },
  getByEmail({ email }: Pick<User, "email">) {
    return prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
  },
  search({ q }: { q: string | undefined }) {
    return prisma.user.findMany({
      where: {
        OR: [{ name: { contains: q } }, { username: { contains: q } }],
      },
      select: fields.public,
      orderBy: [{ username: "desc" }],
    });
  },
  async getMetrics({ id }: Pick<User, "id">) {
    const metrics = await prisma.$transaction([
      prisma.note.count({ where: { userId: id } }),
    ]);

    return configUser.navigationItems.map((item, index) => {
      return {
        ...item,
        id: createNanoID(),
        count: metrics[index],
      };
    });
  },
};

export const mutation = {
  async login({
    email,
    password,
  }: {
    email: User["email"];
    password: string; // from the form field, but it is not the hash
  }) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { password: true },
    });

    if (!user) {
      return { error: { email: "Email is not registered yet", password: "" } };
    }
    if (!user.password) {
      return { error: { email: "User has no password", password: "" } };
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password.hash
    );

    if (!isPasswordCorrect) {
      return { error: { email: "", password: "Password is incorrect" } };
    }

    // To make sure we only have the essential data in the session
    // Without any other sensitive information
    return {
      user,
      error: null,
    };
  },

  async register({
    name,
    username,
    email,
    password,
  }: Pick<User, "name" | "username" | "email"> & {
    password: UserPassword["hash"];
  }) {
    const userUsername = await prisma.user.findUnique({ where: { username } });

    if (userUsername) {
      return {
        error: {
          name: "",
          username: "Username already taken",
          email: "",
          password: "",
        },
      };
    }

    const userEmail = await prisma.user.findUnique({
      where: { email },
      include: { password: true },
    });

    if (userEmail) {
      return {
        error: {
          name: "",
          username: "",
          email: "Email is already used",
          password: "",
        },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const defaultUserRole = await prisma.userRole.findFirst({
      where: { symbol: "NORMAL" },
    });
    invariant(defaultUserRole, "User Role with symbol NORMAL is not found");

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: { create: { hash: hashedPassword } },
        role: { connect: { id: defaultUserRole.id } },
        profile: {
          create: {
            headline: "I am new here",
            bio: "This is my profile bio.",
          },
        },
      },
    });

    return {
      user,
      error: null,
    };
  },

  deleteByEmail(email: User["email"]) {
    return prisma.user.delete({ where: { email } });
  },
};
