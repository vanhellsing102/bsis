import Image from "next/image";
import connectDb from "../../utils/connectDb";

const PostCard = () => {
    connectDb();
    return (
        <div className="p-3 border border-slate-500 rounded-lg h-[300px]">
            <div className="flex items-center gap-3">
                <Image className="w-10 h-10 rounded-full border border-blue-600" width={100} height={100} src={"/images/postcard/download.png"} alt="user porfile"></Image>
                <div>
                    <h3 className="text-[17px] font-semibold">Md Murad</h3>
                    <p className="text-sm text-slate-500">
                        <span>thuesday 2025</span>
                        <span>boda, panchagarh</span>
                    </p>
                </div>
            </div>
            <h2 className="text-xl font-medium">Title</h2>
            <p className="text-slate-600 text-[17px]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi natus minus fuga! Beatae cupiditate ullam saepe earum, rem fugiat cumque.</p>
            <Image className="bg-cover" width={100} height={100} alt="issue image" src={"/images/postcard/istockphoto-2001793134-1024x1024.jpg"}></Image>
        </div>
    );
};

export default PostCard;