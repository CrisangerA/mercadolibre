import Typograpy from "./Typograpy";

export default function Breadcumbs({ categories }: { categories?: string[] }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {categories?.map((categoty, i) =>
          <li key={i} className="breadcrumb-item">
            <Typograpy size={14}>
              {categoty}
            </Typograpy>
          </li>
        )}
      </ol>
    </nav>
  )
}