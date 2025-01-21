// import React, { useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import { fetchMangaDetails } from "../utils/api";

// const MangaDetails = () => {
//   const location = useLocation();
//   const { id } = useParams();
//   const { title, type, status, coverImage, description } = location.state || {};

//   const [chapters, setChapters] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const chaptersPerPage = 20;

//   useEffect(() => {
//     const fetchChapters = async () => {
//       try {
//         setIsLoading(true);
//         const offset = (currentPage - 1) * chaptersPerPage;
//         const response = await fetchMangaDetails(id, offset, chaptersPerPage);

//         if (response?.data) {
//           // Remove any filtering that might be excluding valid chapters
//           const validChapters = response.data.filter(
//             (chapter) => chapter.attributes.translatedLanguage === "en"
//           );

//           setChapters(validChapters);
//           const total = response.data.total || 0;
//           setTotalPages(Math.ceil(total / chaptersPerPage));
//         }
//       } catch (error) {
//         console.error("Error fetching chapters:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (id) {
//       fetchChapters();
//     }
//   }, [id, currentPage, chaptersPerPage]);

//   const formatChapterNumber = (number) => {
//     return number ? parseFloat(number).toFixed(1).replace(/\.0$/, "") : "N/A";
//   };

//   return (
//     <div className="bg-gray-900 min-h-screen text-white p-5">
//       <div className="container mx-auto">
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Manga Info Section */}
//           <div className="md:w-1/3">
//             <img
//               src={coverImage || "/placeholder.svg"}
//               alt={title}
//               className="w-full rounded-lg shadow-lg"
//             />
//             <h1 className="text-2xl font-bold mt-4">{title}</h1>
//             <p className="text-gray-300">Status: {status}</p>
//             <p className="text-gray-300">Type: {type}</p>
//             <p className="text-gray-300 mt-4">{description}</p>
//           </div>

//           {/* Chapters Section */}
//           <div className="md:w-2/3">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold">Chapters</h2>
//               <span className="text-gray-400">Total: {chapters.length}</span>
//             </div>

//             {isLoading ? (
//               <div className="text-center py-4">Loading chapters...</div>
//             ) : chapters.length > 0 ? (
//               <div className="grid gap-2">
//                 {chapters.map((chapter) => (
//                   <div
//                     key={chapter.id}
//                     className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors"
//                   >
//                     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
//                       <div className="flex flex-col sm:flex-row sm:items-center gap-2">
//                         <span className="font-medium">
//                           Chapter{" "}
//                           {formatChapterNumber(chapter.attributes.chapter)}
//                         </span>
//                         {chapter.attributes.title && (
//                           <span className="text-gray-400">
//                             - {chapter.attributes.title}
//                           </span>
//                         )}
//                       </div>
//                       <div className="flex gap-4 text-sm text-gray-400">
//                         {chapter.attributes.externalUrl && (
//                           <a
//                             href={chapter.attributes.externalUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-400 hover:text-blue-300"
//                           >
//                             Read
//                           </a>
//                         )}
//                         <span>
//                           {new Date(
//                             chapter.attributes.publishAt
//                           ).toLocaleDateString()}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-4 text-gray-400">
//                 No chapters found. This manga might not have any English
//                 chapters available.
//               </div>
//             )}

//             {totalPages > 1 && (
//               <div className="flex justify-center items-center gap-2 mt-6">
//                 <button
//                   onClick={() => setCurrentPage(1)}
//                   disabled={currentPage === 1}
//                   className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed"
//                 >
//                   First
//                 </button>

//                 <button
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.max(1, prev - 1))
//                   }
//                   disabled={currentPage === 1}
//                   className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed"
//                 >
//                   Previous
//                 </button>

//                 <span className="px-3 py-1">
//                   Page {currentPage} of {totalPages}
//                 </span>

//                 <button
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.min(totalPages, prev + 1))
//                   }
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed"
//                 >
//                   Next
//                 </button>

//                 <button
//                   onClick={() => setCurrentPage(totalPages)}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed"
//                 >
//                   Last
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MangaDetails;

import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchMangaDetails } from "../utils/api";

const MangaDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const { title, type, status, coverImage, description } = location.state || {};

  const [latestChapters, setLatestChapters] = useState([]);
  const [allChapters, setAllChapters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const chaptersPerPage = 20;

  // Fetch latest chapters
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await fetchMangaDetails(id, 0, 5);
        if (response?.data) {
          const chapters = response.data
            .filter((chapter) => chapter.attributes.translatedLanguage === "en")
            .sort((a, b) => {
              return (
                parseFloat(b.attributes.chapter) -
                parseFloat(a.attributes.chapter)
              );
            });
          setLatestChapters(chapters.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching latest chapters:", error);
      }
    };
    if (id) fetchLatest();
  }, [id]);

  // Fetch paginated chapters
  useEffect(() => {
    const fetchPaginatedChapters = async () => {
      try {
        setIsLoading(true);
        const offset = (currentPage - 1) * chaptersPerPage;
        const response = await fetchMangaDetails(id, offset, chaptersPerPage);

        if (response?.data) {
          const chapters = response.data
            .filter((chapter) => chapter.attributes.translatedLanguage === "en")
            .sort((a, b) => {
              return (
                parseFloat(a.attributes.chapter) -
                parseFloat(b.attributes.chapter)
              );
            });

          setAllChapters(chapters);
          const total = response.total || 0;
          setTotalPages(Math.ceil(total / chaptersPerPage));
        }
      } catch (error) {
        console.error("Error fetching chapters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchPaginatedChapters();
  }, [id, currentPage]);

  const ChapterCard = ({ chapter }) => (
    <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
      <div className="flex justify-between items-center">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="font-medium">
            Chapter {parseFloat(chapter.attributes.chapter).toString()}
          </span>
          {chapter.attributes.title && (
            <span className="text-gray-400">- {chapter.attributes.title}</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          {chapter.attributes.externalUrl && (
            <a
              href={chapter.attributes.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Read
            </a>
          )}
          <span className="text-gray-400 text-sm">
            {new Date(chapter.attributes.publishAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen text-white p-5">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Manga Info Section */}
          <div className="md:w-1/3">
            <img
              src={coverImage || "/placeholder.svg"}
              alt={title}
              className="w-full rounded-lg shadow-lg"
            />
            <h1 className="text-2xl font-bold mt-4">{title}</h1>
            <p className="text-gray-300">Status: {status}</p>
            <p className="text-gray-300">Type: {type}</p>
            <p className="text-gray-300 mt-4">{description}</p>
          </div>

          {/* Chapters Section */}
          <div className="md:w-2/3">
            {/* Latest Chapters Section */}
            {latestChapters.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Latest Chapters</h2>
                <div className="grid gap-2">
                  {latestChapters.map((chapter) => (
                    <ChapterCard key={chapter.id} chapter={chapter} />
                  ))}
                </div>
              </div>
            )}

            {/* All Chapters Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">All Chapters</h2>
              {isLoading ? (
                <div className="text-center py-4">Loading chapters...</div>
              ) : allChapters.length > 0 ? (
                <div className="grid gap-2">
                  {allChapters.map((chapter) => (
                    <ChapterCard key={chapter.id} chapter={chapter} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-400">
                  No chapters found
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed"
                  >
                    First
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed"
                  >
                    Last
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaDetails;
