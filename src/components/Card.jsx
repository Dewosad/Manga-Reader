import { useNavigate } from "react-router-dom";

const Card = ({ id, title, type, status, coverImage, description }) => {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/manga_detail/${id}`, {
      state: {
        coverImage,
        title,
        type,
        status,
        description,
      },
    });
  };

  return (
    <div
      onClick={handleOpen}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-md  hover:animate-color-glow transition-all duration-300 cursor-pointer w-64 h-[400px] px-3 py-3 justify-between flex flex-col"
    >
      <div className="relative h-[250px]">
        <img
          src={coverImage || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 pb-2 border-t border-white">
        <h3 className="text-white font-bold text-lg line-clamp-2 text-start">
          {title}
        </h3>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Type: {type}</span>
          <span className=" bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
            Status: {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
