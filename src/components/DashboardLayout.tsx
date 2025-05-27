import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import BottomBar from './BottomBar';

type LayoutProps = {
     children: ReactNode;
};

export default function DashboardLayout({ children }: LayoutProps) {
     return (
          <div className="min-h-screen flex flex-col relative">
               <DashboardHeader />
               <div className="flex max-w-[1140px] mx-auto w-full justify-between items-start gap-[50px]">
                    <Sidebar />
                    <main className="max-w-[776px] mx-auto w-full px-5 md:px-0 pb-[80px]">{children}</main>
                    <BottomBar/>
               </div>
          </div>
     );
}
