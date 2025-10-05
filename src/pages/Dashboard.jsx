import Clock from "../components/clock/Clock.jsx";
import Weather from "../components/weather/Weather.jsx";
import Todo from "../components/todo/Todo.jsx";
import Fact from "../components/fact/Fact.jsx";
import MyNews from "../components/news/MyNews.jsx";
import Favorites from "../components/gutendex/Favorites.jsx";

export default function Dashboard() {
  const widgets = [
    {
      id: "clock",
      title: "Clock",
      component: Clock,
    },
    {
      id: "weather",
      title: "Weather",
      component: Weather,
    },
    {
      id: "favorites",
      title: "My Books",
      component: Favorites,
    },
    {
      id: "mynews",
      title: "My News",
      component: MyNews,
    },
    {
      id: "fact",
      title: "Fact of the Day",
      component: Fact,
    },
    {
      id: "todo",
      title: "To-Do",
      component: Todo,
    },
  ];

  const renderWidget = (id) => {
    switch (id) {
      case "clock":
        return <Clock />;
      case "weather":
        return <Weather />;
      case "favorites":
        return <Favorites />;
      case "mynews":
        return <MyNews />;
      case "fact":
        return <Fact />;
      case "todo":
        return <Todo />;
      default:
        return null;
    }
  };

  return (
    <>
      <main className="dashboard-container">
        {widgets.map(({ id, title }) => {
          return (
            <section className={`${id}-section`} key={id}>
              <header>
                <h2>{title}</h2>
              </header>
              {renderWidget(id)}
            </section>
          );
        })}
      </main>
    </>
  );
}
