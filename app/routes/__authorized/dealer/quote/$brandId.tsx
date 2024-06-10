import { Form, useActionData, useLoaderData, useParams, useNavigation } from '@remix-run/react'
import { Input, Label, Button, Separator } from '~/components/ui/index'
import { ActionArgs, type DataFunctionArgs, json, type MetaFunction, type LoaderFunction, redirect } from '@remix-run/node'
import { ButtonLoading, } from "~/components";
import { GetUser } from "~/utils/loader.server";
import { prisma } from "~/libs";
import { ImageSelect } from '~/overviewUtils/imageselect'
import { quoteAction, quoteLoader } from '~/components/actions/quote$brandIdAL'
import React, { useRef, useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import { findQuoteById } from '~/utils/finance/get.server';
import { getSession } from '~/sessions/auth-session.server';
import { CheckCircleFillIcon, AlertFillIcon } from '@primer/octicons-react'
import customer from '~/styles/customer.css'

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: customer },
];
export const loader: LoaderFunction = async ({ request, params }) => {
    const session = await getSession(request.headers.get("Cookie"));
    const email = session.get("email")

    let user = await GetUser(email);
    if (!user) { redirect('/login') }
    const brandId = params.brandId
    switch (user?.newLook) {
        case 'on':
            return redirect(`/dealer/quote/new/${brandId}`)
        default:
            null
    }
    let modelList;

    switch (brandId) {
        case 'Harley-DavidsonMY24':
            modelList = await prisma.harley24.findMany()
            break;
        case 'Ski-Doo-MY24':
            modelList = await prisma.my24canam.findMany()
            break;
        case 'Can-Am-SXS-MY24':
            modelList = await prisma.my24canam.findMany()
            break;
        case 'Kawasaki':
            modelList = await prisma.kawasaki.findMany()
            break;
        case 'Manitou':
            modelList = await prisma.manitou.findMany()
            break;
        case 'Sea-Doo':
            modelList = await prisma.seadoo.findMany()
            break;
        case 'Switch':
            modelList = await prisma.switch.findMany()
            break;
        case 'Can-Am':
            modelList = await prisma.canam.findMany()
            break;
        case 'Can-Am-SXS':
            modelList = await prisma.canamsxs.findMany()
            break;
        case 'KTM':
            modelList = await prisma.harley24.findMany()
            break;
        case 'Ski-Doo':
            modelList = await prisma.skidoo.findMany()
            break;
        case 'Suzuki':
            modelList = await prisma.suzuki.findMany()
            break;
        case 'Triumph':
            modelList = await prisma.triumph.findMany()
            break;
        case 'BMW-Motorrad':
            modelList = await prisma.bmwmoto.findMany()
            break;
        case 'Indian':
            modelList = await prisma.harley24.findMany()
            break;
        case 'Yamaha':
            modelList = await prisma.harley24.findMany()
            break;
        case 'Spyder':
            modelList = await prisma.spyder.findMany()
            break;
        case 'Harley-Davidson':
            modelList = await prisma.harley.findMany()
            break;
        default:
            null
    }

    const userId = user?.id

    const urlSegments = new URL(request.url).pathname.split('/');
    const financeId = urlSegments[urlSegments.length - 1];
    let sliderWidth = session.get("sliderWidth");
    if (!sliderWidth) {
        sliderWidth = 500;
    }

    if (financeId.length > 32) {
        const finance = await findQuoteById(financeId);
        return json({ finance, sliderWidth, financeId, userId, modelList, user, email })
    }

    else {
        return json({ email, sliderWidth, userId, modelList, user })
    }
}

export let action = quoteAction

export default function Quote() {
    let { brandId } = useParams()
    const { userId, modelList, user, sliderWidth } = useLoaderData()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    useEffect(() => {
        const userEmail = window.sessionStorage.getItem("email");
        const userName = window.sessionStorage.getItem("name");
        setName(decodeURIComponent(userName) || '')
        setEmail(decodeURIComponent(userEmail) || '')
    }, []);
    console.log(email, name, 'from auth in quote')
    const errors = useActionData() as Record<string, string | null>;
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    function BusyIndicator() {
        React.useEffect(() => {
            if (isSubmitting) {
                toast.success('Quote has been created')
            }
        }, [isSubmitting]);
    }
    const [outletSize, setOutletSize] = useState(sliderWidth);
    console.log(sliderWidth, outletSize, "sliderWidth in function");
    const handleSliderChange = (event) => {
        const newSize = `${event.target.value}%`;
        setOutletSize(newSize);
    };
    console.log(sliderWidth);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        model: '',
        year: '',
    });

    const [validity, setValidity] = useState({
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        phone: undefined,
        model: undefined,
        year: undefined,
    });

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(ca|com)$/;

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'firstName':
            case 'lastName':
            case 'model':
                return value.trim().length > 3;
            case 'email':
                return emailRegex.test(value.trim());
            case 'phone':
                return value.replace(/\D/g, '').length === 10;
            case 'year':
                return value.length === 4;
            default:
                return true; // Default to true for unknown fields
        }
    };

    const handleChange = (fieldName, value) => {
        console.log(fieldName, value)
        const isValid = validateField(fieldName, value);
        setValidity((prevValidity) => ({
            ...prevValidity,
            [fieldName]: isValid,
        }));

        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const [modelError, SetModelError] = useState(false)

    const handleHoverSubmit = () => {
        if (String(formData.model).length < 3) (
            SetModelError(true)
        )
    }
    useEffect(() => {
        console.log(modelError, validity.model, formData.model, 'modelError and validty')
    }, [modelError, validity.model]);

    return (
        <>
            <div className="mx-auto my-auto mt-[55px] " style={{ width: outletSize }}>
                <ImageSelect />
                <Form method='post' >
                    <div className='mx-auto' >
                        <div className="mt-3">
                            <h3 className="text-2xl font-thin">CLIENT INFORMATION</h3>
                        </div>
                        <hr className='text-black max-w-md' />
                        <div onMouseEnter={handleHoverSubmit} className="grid grid-cols-1 gap-2 mt-1 " >
                            <div className="grid w-full max-w-md items-center gap-1.5">
                                <Label htmlFor="email">First Name *</Label>
                                <Input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    className={`input bg-[#ffffff]
                                             ${validity.firstName === true ? 'border-green11 bg-green11 text-foreground' : ' '}
                                             ${validity.firstName === false ? 'border-red11 bg-red11 text-foreground' : ''}
                                              `}
                                    onChange={(e) => handleChange('firstName', e.target.value)}
                                />
                                {String(validity.firstName).length > 3 && validity.firstName === false && (
                                    <div className="text-[#ff0202] flex items-center">
                                        <AlertFillIcon size={12} />
                                        <p className="mr-3">
                                            First name is required.
                                        </p>
                                    </div>
                                )}
                                {errors?.firstName ? (
                                    <p className="text-[#ff0202] flex items-center">{errors.firstName}</p>
                                ) : null}
                            </div>
                            <div className="grid w-full max-w-md items-center gap-1.5">
                                <Label htmlFor="email">Last Name *</Label>
                                <Input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    className={`input bg-[#ffffff]
                                            ${validity.lastName === true ? 'border-green11 bg-green11 text-foreground' : ''}
                                            ${validity.lastName === false ? 'border-red11 bg-red11 text-foreground' : ''}
                                            `}
                                    onChange={(e) => handleChange('lastName', e.target.value)}
                                />
                                {String(validity.lastName).length > 3 && validity.lastName == false && (
                                    <div className="text-[#ff0202] flex items-center">
                                        <AlertFillIcon size={12} />
                                        <p className="mr-3">
                                            Last name is required.
                                        </p>
                                    </div>
                                )}
                                {errors?.lastName ? (
                                    <p className="text-[#ff0202] flex items-center">{errors.lastName}</p>
                                ) : null}
                            </div>
                            <div className="grid w-full max-w-md items-center gap-1.5">
                                <Label htmlFor="email">Phone Number</Label>
                                <div className={`border border-bg-background items-center flex rounded-md w-full bg-[#ffffff]
                                            ${validity.phone === true ? 'border-green11 bg-green11 text-foreground' : ''}
                                            ${validity.phone === false ? 'border-red11 bg-red11 text-foreground' : ''}
                                             `}>
                                    <Button variant='ghost' disabled  >
                                        +1
                                    </Button>
                                    <Input
                                        type="phone"
                                        name="phone"
                                        value={formData.phone}
                                        className='bg-[#ffffff]   border-none'
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                    />
                                </div>
                                {String(validity.phone).length > 3 && validity.phone === false && (
                                    <div className="text-[#ff0202] flex items-center">
                                        <AlertFillIcon size={12} />
                                        <p className="mr-3">
                                            Phone number is not valid...
                                        </p>
                                    </div>
                                )}
                                {errors?.phone ? (
                                    <p className="text-[#ff0202] flex items-center">{errors.phone}</p>
                                ) : null}
                            </div>
                            <div className="grid w-full max-w-md items-center gap-1.5">
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    placeholder=""
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    className={`input bg-[#ffffff]
                                            ${validity.email === true ? 'border-green11 bg-green11 text-foreground' : ' '}
                                            ${validity.email === false ? 'border-red11 bg-red11 text-foreground' : ''}
                                             `}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                />
                                {String(validity.email).length > 3 && validity.email === false && (
                                    <div className="text-[#ff0202] flex items-center">
                                        <AlertFillIcon size={12} />
                                        <p className="mr-3">
                                            Email is not valid...
                                        </p>
                                    </div>
                                )}
                                {errors?.email ? (
                                    <p className="text-[#ff0202] flex items-center">{errors.email}</p>
                                ) : null}
                            </div>
                            <div className='flex '>
                                <div className="grid w-full max-w-md items-center gap-1.5">
                                    <Label htmlFor="email">Address</Label>
                                    <Input
                                        placeholder=""
                                        type="string"
                                        name="address"
                                        className={`input bg-[#ffffff]     `}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-3">
                            <h3 className="text-2xl font-thin">MODEL INFORMATION</h3>
                        </div>
                        <hr className='text-black max-w-md' />
                        <div className="grid grid-cols-1 gap-2 mt-1 " >
                            <div className="grid w-full max-w-md items-center gap-1.5">

                                <Label className="mt-3 flex" htmlFor="area">
                                    Model *
                                </Label>
                                <select
                                    name='model'
                                    className={` w-full placeholder:text-blue-300  mx-auto bg-white text-black hover:bg-transparent h-9 cursor-pointer rounded-md border  px-3 text-xs uppercase shadow transition-all duration-150 ease-linear focus:outline-none  focus:border-[#60b9fd]
                                    ${modelError === false && validity.model === false ? 'border-black bg-white text-black' : ' '}

                                    ${modelError === true ? 'border-red11 bg-red11 text-foreground' : ' '}
                                     ${validity.model === true && modelError === false ? 'border-green11 bg-green11 text-foreground' : ' '}
                                     ${validity.model === false ? 'border-red11 bg-red11 text-foreground' : ''}
                                     `}
                                    onChange={(e) => {
                                        SetModelError(false);
                                        handleChange('model', e.target.value); // Pass the selected value to handleChange
                                    }}
                                >
                                    <option value='' >Search By Model</option>
                                    {modelList.map((model, index) => (
                                        <option key={index} value={model.model}>
                                            {model.model}
                                        </option>
                                    ))}
                                </select>
                                {modelError === true && (
                                    <div className="text-[#ff0202] flex items-center">
                                        <AlertFillIcon size={12} />
                                        <p className="mr-3">
                                            Model is required.
                                        </p>
                                    </div>
                                )}
                                {errors?.model ? (
                                    <p className="text-[#ff0202] flex items-center">{errors.model}</p>
                                ) : null}
                            </div>
                            <div
                                onMouseEnter={handleHoverSubmit}
                                className="grid grid-cols-2 gap-2 mt-1 max-w-md  " >
                                <div className="grid gap-1.5  items-center">
                                    <Label>Year</ Label>
                                    <Input
                                        placeholder=""
                                        type="number"
                                        name="year"
                                        value={formData.year}
                                        className={`input bg-[#ffffff]
                                             ${validity.year === true ? 'border-green11 bg-green11 text-foreground' : ' '}
                                             ${validity.year === false ? 'border-red11 bg-red11 text-foreground' : ''}
                                              `}
                                        onChange={(e) => handleChange('year', e.target.value)}
                                    />
                                    {String(validity.year).length > 3 && validity.year === false && (
                                        <p className="text-[#ff0202] flex items-center">
                                            <AlertFillIcon size={12} /> Year is not valid...
                                        </p>
                                    )}

                                </div>
                                <div className="grid items-center gap-1.5  ">
                                    <Label>Stock Number</Label>
                                    <Input
                                        placeholder=""
                                        type="string"
                                        name="stockNum"
                                        className={`input bg-[#ffffff]     `}
                                    />
                                </div>
                                <div></div>
                                <Input type="hidden" name="iRate" defaultValue={10.99} />
                                <Input type="hidden" name="tradeValue" defaultValue={0} />
                                <Input type="hidden" name="lien" defaultValue={0} />
                                <Input type="hidden" name="discount" defaultValue={0} />
                                <Input type="hidden" name="followUpDay" defaultValue={3} />
                                <Input type="hidden" name="deposit" defaultValue={0} />
                                <Input type="hidden" name="months" defaultValue={60} />
                                <Input type="hidden" name="accessories" defaultValue={0} />
                                <Input type="hidden" name="userId" defaultValue={user.id} />
                                <Input type="hidden" name="brand" defaultValue={brandId} />
                                <Input type="hidden" name="userEmail" defaultValue={user.email} />
                                <Input type="hidden" name="userName" defaultValue={user.name} />
                                <ButtonLoading
                                    size="sm"
                                    type="submit"
                                    className="w-auto cursor-pointer ml-auto mt-5 bg-white hover:bg-transparent"
                                    name="intent"
                                    value="submit"
                                    isSubmitting={isSubmitting}
                                    loadingText="Creating finance deal..."
                                >
                                    Next
                                </ButtonLoading>
                            </div>
                        </div>
                        <div className="mb-[25px] mt-[25px] flex justify-center">
                            <input
                                name="sliderWidth"
                                type="range"
                                min="35"
                                max="100"
                                value={parseInt(outletSize)}
                                onChange={handleSliderChange}
                                className="bg-gray-300 h-3 w-1/2 appearance-none rounded-full shadow-sm outline-none "
                                style={{
                                    background: `linear-gradient(to right, slate10 ${parseInt(
                                        outletSize
                                    )}%, black ${parseInt(outletSize)}%)`,
                                }}
                            />
                            <style> {``} </style>
                        </div>
                    </div>
                </Form >
            </div >
        </>
    )
}

export const meta = () => {
    return [
        { title: "Quote - Dealer Sales Assistant" },
        {
            property: "og:title",
            content: "Your very own assistant!",
        },
        {
            name: "description",
            content: "To help sales people achieve more. Every automotive dealer needs help, especialy the sales staff. Dealer Sales Assistant will help you close more deals more efficiently.",
            keywords: 'Automotive Sales, dealership sales, automotive CRM',
        },
    ];
};
