import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PostsPagination({
  page,
  maxPage,
}: {
  page: number;
  maxPage: number;
}) {
  const getHref = (page: number) => `?page=${String(page)}#userPageTabs`;
  return (
    <Pagination className="my-16">
      <PaginationContent>
        {page > 1 && (
          <PaginationItem className="hidden sm:list-item">
            <PaginationPrevious href={getHref(page - 1)} />
          </PaginationItem>
        )}
        {page > 1 && (
          <PaginationItem>
            <PaginationLink href={getHref(1)}>1</PaginationLink>
          </PaginationItem>
        )}

        {page == 4 ? (
          <PaginationItem>
            <PaginationLink href={getHref(2)}>{String(2)}</PaginationLink>
          </PaginationItem>
        ) : page > 3 ? (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ) : null}

        {page > 2 && (
          <PaginationItem>
            <PaginationLink href={getHref(page - 1)}>
              {String(page - 1)}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive href={getHref(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
        {page < maxPage - 1 && (
          <PaginationItem>
            <PaginationLink href={getHref(page + 1)}>
              {String(page + 1)}
            </PaginationLink>
          </PaginationItem>
        )}
        {page == maxPage - 3 ? (
          <PaginationItem>
            <PaginationLink href={getHref(maxPage - 1)}>
              {String(maxPage - 1)}
            </PaginationLink>
          </PaginationItem>
        ) : page < maxPage - 2 ? (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ) : null}
        {page !== maxPage && (
          <PaginationItem>
            <PaginationLink href={getHref(maxPage)}>
              {String(maxPage)}
            </PaginationLink>
          </PaginationItem>
        )}
        {page < maxPage && (
          <PaginationItem className="hidden sm:list-item">
            <PaginationNext href={getHref(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
