import Image from "next/image";

const PostCard = ({post}) => {
    const {title, description, image} = post;
    // console.log(post)
    return (
        <div className="p-3 border border-slate-500 rounded-lg">
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
            <h2 className="text-xl font-medium">{title}</h2>
            <p className="text-slate-600 text-[17px]">{description}</p>
            <div className="flex items-center justify-center border-t border-slate-500 py-2">
                <Image className="h-[180px] w-auto" width={100} height={100} alt="issue image" src={image}></Image>
            </div>
        </div>
    );
};

export default PostCard;