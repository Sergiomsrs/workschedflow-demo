import { Route, Routes } from "react-router-dom"
import { Landing } from "./Landing"
import { Navbar } from "../utilComponents/Navbar"
import { FormUser } from "./FormUser"
import { EmployeeWeek } from "./EmployeeWeek"
import { Daily } from "../gridComponents/Daily"
import { TechInfo } from "./TechInfo"
import { ScrollToTop } from "../landing/ScrollToTop "

export const MainPage = () => {
  return (
    
    <div  className="bg-gray-100 text-gray-900 min-h-screen w-full max-w-full overflow-x-hidden px-1 sm:px-8 lg:px-16">
      
      <div className="container w-full py-8" >

        <header className="mb-8">
          <Navbar />
        </header>
        <ScrollToTop />
        <main className="flex flex-col ">
          <Routes>
            <Route path="/" element={<Daily />} />
            <Route path="/workschedflow-demo/" element={<Daily />} />
            <Route path="/workschedflow-demo/employeeweek" element={<EmployeeWeek />} />
            <Route path="/workschedflow-demo/landing" element={<Landing />} />
            <Route path="/workschedflow-demo/adduser" element={<FormUser />} />
            <Route path="/workschedflow-demo/techinfo" element={<TechInfo />} />
          </Routes>
        </main>

        <footer className="mt-8">
          <p className="text-center">© 2024 My Website. All rights reserved.</p>
        </footer>

      </div>
    </div>
  )
}
