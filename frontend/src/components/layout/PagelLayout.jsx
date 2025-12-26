import Sidebar from '../frame/Sidebar';
import Header from '../frame/Header';
import Rightsildebar from '../frame/Rightsildebar';

const PageLayout = ({ children }) => {
    return (
        <div className="flex justify-center min-h-screen">
            {/* Sidebar Placeholder to push content */}
            <div className="w-[280px] hidden md:block shrink-0" />
            <Sidebar />

            <div className="flex-1 w-full max-w-[1000px] mx-4">
                <Header />
                {children}
            </div>

            {/* Right Sidebar Placeholder */}
            <div className="w-[320px] hidden lg:block shrink-0" />
            <Rightsildebar />
        </div>
    );
};

export default PageLayout;
