// Testing Books
import SearchTest from "../components/devTests/SearchTest";
import GetBookDetailsTest from "../components/devTests/GetBookDetailsTest";
import GetBooksByCategoryTest from "../components/devTests/GetBooksByCategoryTest";

export default function Dev() {
  return (
    <div className="dev-tests-div">
      <h2>Development & Testing</h2>
      <SearchTest />
      <GetBookDetailsTest />
      <GetBooksByCategoryTest />
    </div>
  );
}
