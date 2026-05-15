import Link from "next/link";

export interface ScholarshipCardData {
  id: string;
  title: string;
  description: string;
  closes?: string;
  image: string;
  link?: string;
  slug?: string;
}

interface ScholarshipCardProps {
  data: ScholarshipCardData;
}

export default function ScholarshipCard({ data }: ScholarshipCardProps) {
  const detailHref = data.slug ? `/scholarships/${data.slug}` : undefined;

  return (
    <Link href={detailHref}>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
        {detailHref ? (
          <Link
            href={detailHref}
            className="aspect-[4/3] bg-gray-50 relative block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-full object-cover"
            />
          </Link>
        ) : (
          <div className="aspect-[4/3] bg-gray-50 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-5 flex flex-col flex-1">
          {detailHref ? (
            <Link
              href={detailHref}
              className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 hover:text-[#1a1b80] block"
            >
              {data.title}
            </Link>
          ) : (
            <h4 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
              {data.title}
            </h4>
          )}
          <p className="text-gray-500 text-xs text-justify mb-4 leading-relaxed line-clamp-4 flex-1">
            {data.description}
          </p>

          <div className="flex items-center justify-between mt-auto gap-3">
            {data.closes ? (
              <span className="text-xs font-semibold text-yellow-600">
                Closes {data.closes}
              </span>
            ) : (
              <span />
            )}
            {data.link ? (
              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a1b80] text-white text-xs font-semibold px-6 py-2 rounded-full hover:bg-blue-900 transition-colors shrink-0"
              >
                Apply
              </a>
            ) : detailHref ? (
              <Link
                href={detailHref}
                className="bg-[#1a1b80] text-white text-xs font-semibold px-6 py-2 rounded-full hover:bg-blue-900 transition-colors shrink-0"
              >
                View
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}
