"use client";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";

const Paginate = ({
  url,
  page,
  limit,
  total,
  setPage,
}: {
  url: string;
  page: number;
  limit: number;
  total: number;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  const totalPages = Math.ceil(total / limit);
  const nextPage = page + 1;
  const isNextPageAvailable = nextPage <= totalPages;
  const previousPage = page - 1;
  const isPreviousPageAvailable = previousPage >= 1;

  if (!isPreviousPageAvailable && !isNextPageAvailable) return null;

  return (
    <>
      {/* <BeatLoader /> */}
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <Link
          href={isPreviousPageAvailable ? `${url}?page=${previosPage}` : `#`}
        > */}
        <Button
          variant="outline"
          size="sm"
          disabled={!isPreviousPageAvailable}
          onClick={() => setPage(previousPage)}
        >
          Previous
        </Button>
        {/* </Link> */}
        {/* <Link href={isNextPageAvailable ? `${url}?page=${nextPage}` : `#`}> */}
        <Button
          variant="outline"
          size="sm"
          disabled={!isNextPageAvailable}
          onClick={() => setPage(nextPage)}
        >
          Next
        </Button>
        {/* </Link> */}
      </div>
    </>
  );
};

export default Paginate;
