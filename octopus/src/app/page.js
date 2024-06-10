import { Button } from "@/components/ui/button";


export default function Home() {


  return (
    <main className="flex-1 bg-gray-100 dark:bg-gray-800 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
        <ClockIcon className="w-12 h-12 text-primary" />
        <h3 className="text-xl font-bold mt-4">Punch In</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Clock in for the day
        </p>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
        <ClockIcon className="w-12 h-12 text-primary" />
        <h3 className="text-xl font-bold mt-4">Punch Out</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Clock out for the day
        </p>
        <Button className="mt-4">Punch Out</Button>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
        <CurrencyIcon className="w-12 h-12 text-primary" />
        <h3 className="text-xl font-bold mt-4">Cash Flow</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Daily Cash Flow Reporting
        </p>
        <Button className="mt-4">Cash Flow</Button>
      </div>
      */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
        <BoxIcon className="w-12 h-12 text-primary" />
        <h3 className="text-xl font-bold mt-4">New Return</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Process a new return
        </p>
        <Button className="mt-4">New Return</Button>
      </div>
      {/*
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
        <WrenchIcon className="w-12 h-12 text-primary" />
        <h3 className="text-xl font-bold mt-4">Warranty</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Process a warranty claim
        </p>
        <Button className="mt-4">Warranty</Button>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
        <AngryIcon className="w-12 h-12 text-primary" />
        <h3 className="text-xl font-bold mt-4">Damaged Product</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Report a damaged product
        </p>
        <Button className="mt-4">Damaged Product</Button>
      </div> */}
    </main>
  );
}

function AngryIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
      <path d="M7.5 8 10 9" />
      <path d="m14 9 2.5-1" />
      <path d="M9 10h0" />
      <path d="M15 10h0" />
    </svg>
  );
}

function BoxIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function WrenchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function CurrencyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8" />
      <line x1="3" x2="6" y1="3" y2="6" />
      <line x1="21" x2="18" y1="3" y2="6" />
      <line x1="3" x2="6" y1="21" y2="18" />
      <line x1="21" x2="18" y1="21" y2="18" />
    </svg>
  );
}
