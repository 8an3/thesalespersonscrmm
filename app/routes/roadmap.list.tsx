import { Links, Meta, useFetcher, useLoaderData } from "@remix-run/react";
import { Textarea, Separator, Input, Button } from "~/components/ui/index";
import { type MetaFunction, redirect, LoaderFunction, json } from "@remix-run/node";
//import { authenticator } from "~/services";
import React from "react";
import { prisma } from "~/libs";
import { getSession } from "~/sessions/auth-session.server";

import { requireAuthCookie } from '~/utils/misc.user.server';
import { model } from '~/models'


export async function loader({ request, params }: LoaderFunctionArgs) {
	return null

}
export const meta: MetaFunction = ({ data }) => {
	return [
		{ title: "Road Map - Dealer Sales Assistant" },
		{
			property: "og:title",
			content: "Your very own assistant!",
		},
		{
			name: "description",
			content:
				"You can see what we have planned for the future of this service and what will be brought to you.",
			keywords: "Automotive Sales, dealership sales, automotive CRM",
		},
	];
};




export default function Roadmap() {

	const todoRoadmap = [
		{ type: "issue", desc: "API file upload will be released once google approves gmail as its still in the process right now" },
		{ type: "issue", desc: "move staff chat to sms messenger" },
		{ type: "issue", desc: "need to change how to load overview, need to pull your own by financeId maybe save the financeId to local storage or a cookie to always have acxcess to the last one u made" },
		{ type: "issue", desc: "google auth fixed need to verify, put in root" },
		{ type: "issue", desc: "need to redo email templates in overview - wip move email templates to template section??? and just have a email client in its place then it would really just be three choices instead of 100 and something because it would just take whatewver payments that are saved" },
		{ type: "issue", desc: "use same system as notifications to check on new mail, if different than whats saved, creatre notifaction evry 10 mins - wip" },


		{ type: "admin", desc: "export customers" },
		{ type: "admin", desc: "export parts" },
		{ type: "admin", desc: "export acc" },
		{ type: "admin", desc: "import customers" },
		{ type: "admin", desc: "import parts" },
		{ type: "admin", desc: "import acc" },
		{ type: "admin", desc: "have it populate api keys so managers can hand them out" },

		{ type: "Automation", desc: "finish automation dash - wip" },
		{ type: "Automation", desc: "implement server to accommodate automation https://github.com/Saicharan0662/email-scheduler-client" },
		{ type: "Automation", desc: "for lead rotation, if customer pending after an hour it goes up onto a free for all board so anyone can respond to him" },
		{ type: "Automation", desc: "sales person schedule for lead rotation" },
		{ type: "Automation", desc: "have it so you can tag a customers file so when a test drive cmoes around it just reminds you to get them on  ti or on wish ist" },
		{ type: "Automation", desc: "customer set time before delivery of what to bring" },
		{ type: "Automation", desc: "auto email at 5, 2.5 months and 30, 7 days before consent expires, 2 years if bought, 6 months if not" },
		{ type: "Automation", desc: "customer 2 months after pick up to make sure everything is still good" },

		{ type: "wip - crm integration", desc: "complete first integration" },

		{ type: "customer", desc: "have your own csi reporting for the dealer that can be sent to customers" },

		{ type: "crm - > dealer", desc: "redesign subscription page to include 2 optoinns for stand alone sales people and dealers" },

		{ type: "communications", desc: "mass email/sms - wip" },
		{ type: "communications", desc: "email / sms campaigns" },

		{ type: "dash", desc: "cross platform ad manager, post it once here and push it to different providors" },
		{ type: "dash", desc: "sales manager dash since they seem to know Activix less than the salespeople" },
		{ type: "dash", desc: "dynamic dashboard widgets" },

		{ type: "dealer", desc: "calendar to set store hours" },
		{ type: "dealer", desc: "invite user section where it send an email with links to the crm and " },

		{ type: "email", desc: "webhook for incoming emails, save notifiation and messeages" },

		{ type: "sales - campaigns", desc: "https://developers.klaviyo.com/en/reference/get_campaigns" },

		{ type: "dealer onboarding", desc: "initial data can be put into seed file filed out by dealer" },
		{ type: "dealer onboarding", desc: "new sales page with upgrades" },
		{ type: "dealer onboarding", desc: "quote how-to" },
		{ type: "dealer onboarding", desc: "sales dashboard how-to" },
		{ type: "dealer onboarding", desc: "calendar how-to" },
		{ type: "dealer onboarding", desc: "script how-to" },
		{ type: "dealer onboarding", desc: "template how-to" },
		{ type: "dealer onboarding", desc: "payment calc how-to" },
		{ type: "dealer onboarding", desc: "inventory how-to" },
		{ type: "dealer onboarding", desc: "document builder how-to" },
		{ type: "dealer onboarding", desc: "sales process start to finsih" },
		{ type: "dealer onboarding", desc: "free simple install with insructions, fee for total install - for dealer that already have an it team it would save them money" },

		{ type: "service", desc: "tech should just be aqble to look at his agenda and know what hes doing for the day, he should have access to all the information he needs from his terminal without having to go find anyone and bug them about it and no more paperwork" },
		{ type: "service", desc: "service writer dash" },
		{ type: "service", desc: "tech dash" },

		{ type: "accessories", desc: "acc dash" },

		{ type: "infastructure", desc: "have a second non-cloud option, either as a rack for a server or tower for a non tech orientated dealer to be hosted on site but would need a license key that needs a new token every 30 days/6 months/12 months to operate based on payment plan, hardware to be paid upfront before build, payments start once activated at dealer" },

		{ type: "parts", desc: "parts dash" },
		{ type: "parts", desc: "shpping and receiving dash" },
		{ type: "parts", desc: "parts specfic page to print label, make changes etc, have search table that switch from table to part view using use state like the one in newleads" },

		{ type: "sales", desc: "sales bot - take care of some of the sales process - uses natural language processing and machine learning to assist in automated contract negotiations based on predefined parameters." },
		{ type: "sales", desc: "sales bot 2 - customer onboarding" },
		{ type: "sales", desc: "sales bot 3 - after sales" },
		{ type: "sales", desc: "when bike becomes available that customer is looking at or something similar set note in finance file and notifition for user" },
		{ type: "communications", desc: "fb msgr integration" },

		{ type: "quote", desc: "Save form to LOCAL STORASGE(CHECK REMIX SITE FOR SOLUTIONp) incase something happens to connection or if they srep awway from their computer that way whenever you come back the form is filled out the way you left it" },
		{ type: "quote", desc: "set up parts pages - started - Manitou done - switch started" },

		{ type: "google", desc: "utilize other services from google, notes, to-do, sms, voice chat, call recording, video calling, teaam chat?, tasks and plans,  " },
		{ type: 'google', desc: 'has a push notiications for new incoming emails' },
		{ type: 'google', desc: 'tasks' },
		{ type: 'google', desc: 'Calendar' },
		{ type: 'google', desc: 'Keep note' },

		{ type: "ai", desc: "predictive analysis of sales trends" },
		{ type: "ai", desc: "to add onto the last one - unit sold in territories, report already out there owners of dealers get them" },
		{ type: "ai", desc: "Ai assistant to book apointments, complete and etc " },
		{ type: "ai", desc: "customter analysis, retention, customer $ worth, visits, and more" },
		{ type: "ai", desc: "Predictive Customer Behavior Modeling, Utilize advanced machine learning models to predict future customer behaviors and preferences based on historical data. ie percentages on how liuekly the customer can be closed if asked at that time" },

		{ type: "paid feature", desc: "*** currently working - need to attach to components and find a way to turn on or off pending payment by customer ***" },
		{ type: "paid feature", desc: "speech to text for quicker input - done in components folder" },
		{ type: "paid feature", desc: "AI writing partner for emails, templates and scripts - done in components folder" },
		{ type: 'paid feature', desc: 'have ai take in last 5 emails with customer and suggest your next communication/script - not done yet but easy enough to complete in components folder' },
		{ type: 'paid feature', desc: 'vercel has a nice write up on this to do in their platform - ai - wip - https://github.com/steven-tey/chathn/blob/main/app/api/chat/route.ts' },
	];


	const DoneRoadMap = [
		{ type: "issue", desc: "add customer on dashboard needs to be updated to be the same as on calendar" },
		{ type: "sales process", desc: "update finance mgr lock so that the sales person can have a in queue timer" },
		{ type: "issue", desc: "add ping system for notes - COMPLETED BUT NEEDS TESTING" },
		{ type: "issue", desc: "need mileage for new vehciles for printing paperwork" },
		{ type: "issue", desc: "to get notified when new useed units come in for customers wish list - just generate brand / model list to choose from instead of letting them type it in" },
		{ type: "paid feature", desc: "sms messenger" },
		{ type: "dealer onboarding", desc: "each dealer will have their own server on vercel, own database on planetscale, and so forth find a way to automate this even though it doesnt take any time to do so" },
		{ type: "quote", desc: "find source with API with up-to-date model information - Kelly Black Book - they have the product take picutre of blue ages for now and just ocr scan - just going to use dealer binders of dealers that sign up - alkmost completed" },
		{ type: "issue", desc: "email not currently working in overview" },
		{ type: "issue", desc: "to get notified when new useed units come in for customers wish list" },
		{ type: "issue", desc: "lien payout - COMPLETED BUT NEEDS TESTING" },
		{ type: "issue", desc: "csv upload for prodcuts and inventory" },
		{ type: "communications", desc: "set up whatsap for dealing with dealer customers affiliate marketers" },
		{ type: "dash", desc: "dash switcher in settings to change from integration to integration or not" },
		{ type: "communications", desc: "whats app integration" },
		{ type: "issue", desc: "put customer coms in cuterom file not bike file - DID NOT COMPLETE REVISIT AFTER BETA " },
		{ type: "notifications", desc: "push notifications - cheat way to do it in terms of cost and coding - just send a email along with the in app notfication as long as your phone is hooked up to your computer, you will get notified through your phone and computer" },
		{ type: "issue", desc: "last note column" },
		{ type: "issue", desc: "sms messenger" },
		{ type: "issue", desc: "calendar - complete appointment" },
		{ type: "issue", desc: "email refresh token use revalidateOnFocus from swr to refresh tokens https://swr.vercel.app/docs/revalidation" },
		{ type: "Automation", desc: "integration with vercel app - wip" },
		{ type: "user", desc: "fields to add - triggerFieldList in automations" },
		{ type: "customer", desc: "add api to import new leads" },
		{ type: "notifications", desc: "upcoming appt - wip" },
		{ type: "quote", desc: "unit picker - once model is selected with customer=, table will render in modal with the avialble units for sale right on the quote if the customer wants to go for it" },
		{ type: "notifications", desc: "instead of somweething fancy and expensive jsut use db and have it laod on each render, and have page reload afdter 10 mins or something of inactivty - wip" },
		{ type: "sales process", desc: "internal IM system would help with these things, relying on the note system within the custemer files is just stupid - https://github.com/remix-run/examples/tree/main/sse-chat" },
		{ type: "issue", desc: "pre populate random dealer info to start customer can always change it" },
		{ type: "crm integration", desc: "inital api function" },
		{ type: "crm integration", desc: "create matching records - figure out the best way to then integrate the data into our system" },
		{ type: "crm integration", desc: "SyncLeadData - should we update leads from activix each time login? or refresh?" },
		{ type: "issue", desc: "production enviroment with new google implmentation" },
		{ type: "issue", desc: "registration" },
		{ type: "calendar", desc: "render sms or email clients in claendsar appointments to take care of that right then and ther" },
		{ type: "user", desc: "add 2FA" },
		{ type: "issue", desc: "QUOTE/USED - wip" },
		{ type: "issue", desc: "internal chat" },
		{ type: "issue", desc: "notifications" },
		{ type: "admin", desc: "import of lists like inventory, customers, parts, acc" },
		{ type: "admin", desc: "add new users through admin protal" },
		{ type: "dash", desc: "pop up to display entire conversation history non interactive because that wont work" },
		{ type: "dev", desc: "project is getting to big to continue testing, need a page to automate testing" },
		{ type: "issue", desc: "Calendar missing 2 of its views" },
		{ type: "issue", desc: "admin add user not working properly" },
		{ type: "dash", desc: "import / export customer base" },
		{ type: "admin", desc: "import inventory" },
		{ type: "admin", desc: "export inventory" },
		{ type: "admin", desc: "import users" },
		{ type: "admin", desc: "export users" },
		{ type: "dash", desc: "demo day list like the wish list?" },
		{ type: "dash", desc: "have a quick contact option at the top of the page where you can skip account creation to send an email or text as your typing email or phone it searches for the client file, onc esent the next page would be go to create client file or go to client file " },
		{ type: "user", desc: "need heavy hitter finance manager to accommodate them for CRM" },
		{ type: "quote", desc: "hook up communication counter" },
		{ type: 'google', desc: 'gmail done' },
		{ type: "dash", desc: "import / export inventory" },
		{ type: "admin", desc: "redesign admin page" },
		{ type: "dash", desc: "finance manager dash" },
		{ type: "sales process", desc: "electronic handovers - when you're sitting there customer says yes let's go financing instead of clunkily or very like just not efficiently going to find the f&I if they're not in the office it's going to look for them you know bring them to folder all this garbage and then go back to the customer bring them over when they're ready instead push a buttoon so that way it immediately notifies them cuz like you know when they have customers or when they don't it's already done in the systewm, the deals already built in the system so they don't have to build it at all or anything and they could just run from there so they can either reply be there in 2 seconds or be there in 5 minutes cuz they're on a call or something like that and instead of salesperson getting up going over you know leaving the customer instead they could just be with the customer the entire time and then literally just have that right person just come up into the office and make it seem like a really tight run ship same thing with sales managers the offers that are in the office at his desk or whatever he gets a notification that this customer, your customer in front of you want to get a deal done and he wants to get an XYZ dollars he can just reply to you in the system immediately and get it done for you instead of you know let me go find find him you should never have to leave the customer and it tighters everything up as far as the process goes and the customers experience is going to be like wow these guys know what they're doing they're running a really tight ship everything's quick it's fast like they obviously know what they're doing include the ability to search the inventory on the unit u picked with the custoemr so without leaving the qquote u know its in styock with what colors" },
		{ type: "sales process", desc: "to add to last item - put a non removablew modal for when client is ready to finance when at the dealer that will lock the app of the finance managers till someone clicks accept unless they are already currently in a file, need to find a way to kick them off the file after a period of inactivty to ensure they dont cheat the system" },
		{ type: "client file", desc: "change checkbox section so only finance can change finance items but display once they are checked off" },
		{ type: "admin", desc: "redesign admin page" },
		{ type: "quote", desc: "once sold, do all the stupid stuff behind the scenes rather than having to do it multiple times when u sell a unit" },
		{ type: "inventory", desc: "have inventory hooked to the quotes so the sales perosn can see in while pricing the customer you can see if its in stock and what colors are available" },
		{ type: "Auto print", desc: " have AI component attached to the email client to rewrite emails if needed - huge cost wip" },
		{ type: "user", desc: "statistics page based on data from dash and CRM" },
		{ type: "user", desc: "for sales tracker, add up delivered and add it to sales tracker, whatever the value is now" },
		{ type: "user", desc: "utilize user notifications - sns providor has this option WIP" },
		{ type: "user", desc: "have dealer staff able to edit others' clients" },
		{ type: "Templates", desc: "have an option on the text editor to be able to save as template on text and email so you can quickly savew it and review again later rather than praying you dont close that tab, which u do anyways" },
		{ type: "dash", desc: "make an assigned to area on purchasing tab" },
		{ type: "deployment", desc: "look at some github actions so when you update the main repo it would push the update to all the repos or look into vercel, have one repo for multiple deployments" },
		{ type: "dash", desc: "search to find a customer placed at root WIP" },
		{ type: "dash", desc: "combine customers? idk how i feel about that, would rather have the ability to 'meld' them, becoming one but with multiple units." },
		{ type: "task", desc: "Hide feature buttons if unavailable" },
		{ type: "task", desc: "Move feature buttons to sidebar" },
		{ type: "task", desc: "See if auto email will work in sidebar" },
		{ type: "user", desc: "sms" },
		{ type: "user", desc: "add dealer roles - WIP" },
		{ type: "external link", desc: "https://stackoverflow.com/questions/75189762/how-to-save-contact-details-from-a-website-to-an-android-or-iphone-using-html-bu" },
		{ type: "text client", desc: "chatgpt integration to reply or create or edit emails on the fly with only a short description from you  - huge cost" },
		{ type: "email client", desc: "chatgpt integration to reply or create or edit emails on the fly with only a short description from you  - huge cost" },
		{ type: "quote", desc: "put follow-up buttons on quote as well" },
		{ type: "website", desc: "change favicon based on brand" },
		{ type: "dash", desc: "mass sms" },
		{ type: "dash", desc: "payment calc with no ability to select a unit" },
		{ type: "user", desc: "Allow users to store their own custom emails" },
		{ type: "dash", desc: "lock fields on delivered" },
		{ type: "dash", desc: "mass sms" },
		{ type: "dash", desc: "sms" },
		{ type: "user", desc: "Give the ability for people to upload their own worksheets, contracts, and such - https://pspdfkit.com/guides/web/downloads/" },
		{ type: "email client", desc: "create client - like short wave, they stole my idea for it" },
		{ type: "customer profile", desc: "print area on customer profile to print pre-populated paperwork" },
		{ type: "email client", desc: "email client near completion - utilize other services from azure, notes, to-do, sms, voice chat, call recording, video calling, teaam chat?, tasks and plans,  " },
		{ type: "dash", desc: "crm integration - along with our CRM - WIP" },
		{ type: "Auto print", desc: " customer work sheets - WIP" },
		{ type: "Auto print", desc: " test drive waiver - WIP" },
		{ type: "Auto print", desc: " UCDA - WIP" },
		{ type: "email", desc: "more scriptied emails" },
		{ type: "customer profile", desc: "implement DocuSign" },
		{ type: "user", desc: "send email to salesperson when someone else enters yellow or red notes" },
		{ type: "calendar", desc: "service cal" },
		{ type: "calendar", desc: "parts cal" },
		{ type: "calendar", desc: "sales manager" },
		{ type: "calendar", desc: "finance manager" },
		{ type: "client", desc: "implement server to accommodate automation" },
		{ type: "dash", desc: "record and show all previous interaction" },
		{ type: "dash", desc: "have drop down for notes with ones you use most i.e. was supposed to come in, followed up, no answer so speed up follow up reschedule" },
		{ type: "dash", desc: "calendar" },
		{ type: "user", desc: "Microsoft Outlook has an API for email, can make your own mail page in the app, along with calendar and Todo. Check other services from Microsoft" },
		{ type: "dash", desc: "look at making table from scratch, would alleviate all the problems you're having, and allow for more customization" },
		{ type: "dash", desc: "check this out for a table alternative - https://github.com/bvaughn/react-virtualized" },
		{ type: "dash", desc: "for advanced filtering - https://www.youtube.com/watch?v=MY6ZZIn93V8" },
		{ type: "dash", desc: "date range filter for calls" },
		{ type: "dash", desc: "different tables for different views, i.e., sold, not delivered, pending" },
		{ type: "dash", desc: "under settings have a table that displays delivered and to be delivered" },
		{ type: "dash", desc: "save current filter/sort to cookie so it doesn't interrupt your workflow" },
		{ type: "dash", desc: "implement a way to show reached till phone service is working" },
		{ type: "dash", desc: "filter per column" },
		{ type: "quote", desc: "along with DocuSign, digitize any other docs for a smoother paperwork process" },
		{ type: "user", desc: "allow users to opt out of 2-day auto follow-up" },
		{ type: "dash", desc: "Texting is broken in scripts" },
		{ type: "auto email", desc: "customer set time after delivery thanking them and asking for referrals" },
		{ type: "auto email", desc: "finance - reminders to clients if missing anything from finance or sales" },
		{ type: "task", desc: "Put a copy text button for each script" },
		{ type: "user", desc: "Take off contact and script upload since it's in the menu now" },
		{ type: "dash", desc: "instead of sorting the table to see what deliveries are, have a 3-day rolling list, one less thing to sort on the table, the same in-person appt, not follow-up calls" },
		{ type: "quote", desc: "apt list breakdown on profile with delete and edit options" },
		{ type: "dash", desc: "change filter input to dropdown based on column selection" },
		{ type: "dash", desc: "have it on top of the dashboard so it displays every morning and you can select a button to hide so you never forget about deliveries" },
		{ type: "dash", desc: "change filter input to dropdown based on column selection" },
		{ type: "task", desc: "API file upload does not work in production folder API is already in use by platform Procidor move API/file upload to dealerapi/fileupload" },
		{ type: "task", desc: "Cookies for user preferences" },
		{ type: "task", desc: "Cookies for user preferences" },
		{ type: "dash", desc: "have the dash just be able to send texts and call, have the messenger somewhere else" },
		{ type: "dash", desc: "make full CRM - once done with the original app - WIP" },
		{ type: "user", desc: "instant messenger - to not use LoaderData, that god-awful messenger anymore - started but didn't work out" },
		{ type: "user", desc: "phone working but not on a wide scale" },
		{ type: "quote", desc: "finish customer profile with all functionality" },
		{ type: "dash", desc: "document upload section on dash for each customer" },
		{ type: "user", desc: "allow the user to set the default follow-up day" },
		{ type: "task", desc: "have the last note on the dashboard, have notes on customer page / return to quote button" },
		{ type: "task", desc: "fix attachment to customer notes" },
		{ type: "task", desc: "complete dash with full functionality" },
		{ type: "task", desc: "Cookies for user preferences" },
		{ type: "task", desc: "add attachment to customer notes" },
		{ type: "task", desc: "add reset password" },
		{ type: "task", desc: "automatically complete call when emailing from dashboard" },
		{ type: "task", desc: "add customer button to dash to quickly add customers" },
		{ type: "task", desc: "update state automatically based on what's chosen from the client card" },
		{ type: "task", desc: "just building a CRM - save customers and their vehicle sheets? Uploading to CRM should be good enough. The whole point is not to be a CRM and just help salespeople with speed. By pushing the data to the CRM immediately, there's no point to save it maybe. Have the user only ever update the database so it only has one entry, while keeping access to their quote in profile, show last and all the details" },
		{ type: "task", desc: "settings menu to set variables per salesperson" },
		{ type: "task", desc: "admin dashboard? - started" },
		{ type: "task", desc: "Instant print cash contacts" },
		{ type: "task", desc: "redesign checkbox" },
		{ type: "task", desc: "new navbar" },
		{ type: "task", desc: "backend" },
		{ type: "task", desc: "logos" },
		{ type: "task", desc: "auto payments calc" },
		{ type: "task", desc: "auto print spec sheet without visiting any site" },
		{ type: "task", desc: "page for every brand that we have information on" },
		{ type: "task", desc: "hidden discount inputs - one for $ amount, another for %" },
		{ type: "task", desc: "second print button so it prints the spec sheet of the model the customer is looking at, so you can give it to the customer without having to dig through the ones you already downloaded or go through 16 web pages on Can-Am's website to get to it - completed Kidoo, Can-Am - partial, Manitou, Switch, Sea-Doo" },
		{ type: "task", desc: "query website by stock number to see if it's in stock - not feasible across so many dealers" },
		{ name: "dash - Use twilio conversations so that way you can also talk to Facebook from the messenger with one click" },
		{ name: "user - Give the ability for p ople to upload there own work sheets, contracts and such" },
		{ name: "dash - Have the dash just be able to send twxts and call have the messenger somewhere else  	" },
		{ name: "dash - Icrosoft outlook has an API for email, can make your own mail page in app Along with calendar and Todo check other services from microsoft" },

	];


	const HiddenSection = [
		{ name: "user - sub checker" },
		{ name: "dash - Hide feature buttons if unavailable " },
		{ name: "dash - Set automations to per person only " },
		{ name: "put in automations settings per automation so other people can do it as well" },
		{ name: "Msrp x 2 plus 30" },
	]

	const organizedTasks = {};
	todoRoadmap.forEach((item) => {
		if (!organizedTasks[item.type]) {
			organizedTasks[item.type] = [];
		}
		organizedTasks[item.type].push(item);
	});

	const organizedTasksDone = {};
	DoneRoadMap.forEach((item) => {
		if (!organizedTasksDone[item.type]) {
			organizedTasksDone[item.type] = [];
		}
		organizedTasksDone[item.type].push(item);
	});


	return (
		<>
			<div className="w-[80%] mx-auto">
				<div>
					<h3 className="text-lg font-medium text-picton-blue-50">Roadmap</h3>
					<p className="text-picton-blue-50 text-sm text-picton-blue-50">
						Something you want/need but don't see it on here? Let us know!
					</p>
				</div>
				<Separator />

				<>
					<div>
						<h3 className="text-lg font-medium mt-10 text-picton-blue-50">To-Do</h3>
						<Separator />
						{Object.entries(organizedTasks).map(([type, tasks]) => (
							<div key={type}>
								<h4 className='mt-3 ml-3 text-picton-blue-50'>{type}</h4>
								<Separator />
								{tasks.map((task) => (
									<div key={task.desc} className="ml-3 p-3 flex items-center  mt-3 shadow-md  bg-myColor-900 target:text-[#02a9ff] hover:text-[#02a9ff] text-slate4 active:bg-[#02a9ff]  uppercase  rounded  hover:shadow-md outline-none  ease-linear transition-all duration-150">
										<p color="my-3 py-3 ">
											{task.desc}
										</p>
									</div>
								))}
							</div>
						))}
					</div>
				</>
				<>
					<div>
						<h3 className="text-lg font-medium mt-10 text-picton-blue-50">Completed</h3>
						<Separator />
						{Object.entries(organizedTasksDone).map(([type, tasks]) => (
							<div key={type}>
								<h4 className='mt-3 ml-3 text-picton-blue-50'>{type}</h4>
								<Separator />
								{tasks.map((task) => (
									<div key={task.desc} className="ml-3 mr-3 p-3 flex items-center  mt-3 shadow-md  bg-myColor-900 target:text-[#02a9ff] hover:text-[#02a9ff] text-slate4 active:bg-[#02a9ff]  uppercase  rounded  hover:shadow-md outline-none  ease-linear transition-all duration-150">
										<img
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/a988022497f5e1f4da2fb8abae215748e34227097d0680432329fa00986efb7c?apiKey=fdb7b9e08a6a45868cbaa43480e243cd&"
											className=" w-4 "
											alt="Logo"
										/>
										<p color="my-3 py-3 ml-3">
											{task.desc}
										</p>
									</div>
								))}
							</div>
						))}
					</div>
				</>
			</div>
		</>
	);
}
