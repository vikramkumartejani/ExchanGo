import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import BottomBar from './BottomBar';

type LayoutProps = {
     children: ReactNode;
};

export default function DashboardLayout({ children }: LayoutProps) {
     return (
          <div className="min-h-screen flex flex-col relative overflow-x-hidden">
               <DashboardHeader />
               <div className="flex max-w-[1140px] mx-auto w-full justify-between items-start gap-8 lg:gap-[50px]">
                    <Sidebar />
                    <main className="max-w-[796px] mx-auto w-full px-5 md:pr-5 pb-[120px] overflow-x-auto">{children}</main>
                    <BottomBar/>
               </div>
          </div>
     );
}
