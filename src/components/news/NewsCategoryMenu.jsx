import { useEffect, useState } from "react";
import useNewsAPI from "../../hooks/useNewsAPI";
import styles from "../../styles/NewsCategoryMenu.module.css";
import NewsCard from "./NewsCard";

export default function NewsCategoryMenu() {
  const {
    data,
    loading,
    error,
    sources,
    browseCategory,
    getHeadlines,
    getSources,
    browseSource,
  } = useNewsAPI();

  const [selectedSourceId, setSelectedSourceId] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");

  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  // get headlines on category page mount
  // useEffect(() => {
  //   getHeadlines();
  // }, []);

  // fix initial allsources bug - triggers when sources are loaded
  useEffect(() => {
    if (currentCategory && sources.length > 0 && selectedSourceId === "") {
      // changes event.target.value = '' in order to trigger allsources
      handleSourceChange({ target: { value: "" } });
    }
  }, [currentCategory, sources]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCurrentCategory(selectedCategory);
    setSelectedSourceId("");

    if (selectedCategory) {
      browseCategory(selectedCategory);
      getSources(selectedCategory);
    } else {
      getHeadlines();
    }
  };

  const handleSourceDropdownClick = () => {
    // console.log("Source dropdown clicked");
    // console.log("Current category:", currentCategory);
    // console.log("Sources length:", sources.length);

    if (currentCategory && sources.length === 0) {
      console.log("Fetching sources for:", currentCategory);
      getSources(currentCategory);
    }
  };

  const handleSourceChange = (event) => {
    const sourceId = event.target.value;
    setSelectedSourceId(sourceId);

    if (sourceId) {
      browseSource(sourceId);
    } else {
      if (currentCategory) {
        browseCategory(currentCategory);
      } else {
        getHeadlines();
      }
    }
  };

  return (
    <div className={styles.newsCategoryContainer}>
      <h3>Browse News</h3>

      {/* select category*/}
      <select
        className={styles.newsCategoryList}
        value={currentCategory}
        onChange={handleCategoryChange}
        disabled={loading}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>

      {/* select source - only show if category is selected */}
      {currentCategory && (
        <select
          className={styles.newsSourceList}
          value={selectedSourceId}
          onChange={handleSourceChange}
          onClick={() => {
            console.log("Dropdown clicked");
            handleSourceDropdownClick();
          }}
          disabled={loading}
        >
          <option value="">All Sources</option>
          {sources.map((source) => (
            <option key={source.id} value={source.id}>
              {source.name}
            </option>
          ))}
        </select>
      )}

      {loading && <p className={styles.loading}>Loading news...</p>}
      {error && <p className={styles.error}>Error: {error.message}</p>}

      {/* News results using NewsCard */}
      {data?.articles && (
        <div className={styles.newsList}>
          {data.articles.map((article) => (
            <NewsCard key={article.url} article={article} />
          ))}
        </div>
      )}

      {/* No results message */}
      {data?.articles && data.articles.length === 0 && (
        <div className={styles.noResults}>
          No articles found. Try a different category or source.
        </div>
      )}
    </div>
  );
}

//  {/* Current Selection Display */}
//       <div className={styles.currentSelection}>
//         <p>
//           {!currentCategory ? (
//             "Showing: All Categories (All Sources)"
//           ) : (
//             <>
//               Showing: <strong>{currentCategory}</strong>
//               {selectedSource ? (
//                 <span> from <strong>{sources.find(s => s.id === selectedSource)?.name}</strong></span>
//               ) : (
//                 <span> (All Sources)</span>
//               )}
//             </>
//           )}
//         </p>
//       </div>
