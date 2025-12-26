import { TrendingUp, MessageCircle, BarChart3, LayoutGrid } from "lucide-react"

const Header = () => {
  return (
   <>
   <div className="flex items-center justify-center my-7">
    <div className="flex gap-10 text-sm font-medium justify-center text-gray-400">
        <div className="flex items-center gap-2 hover:text-orange-500 cursor-pointer ">
          <TrendingUp size={16} /> TRENDING
        </div>
        <div className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
          <MessageCircle size={16} /> CONTROVERSIAL
        </div>
        <div className="flex items-center gap-2 hover:text-orange-500 cursor-pointer">
          <BarChart3 size={16} /> TOP
        </div>
      </div>
   </div>
   </>
  );
}

export default Header

