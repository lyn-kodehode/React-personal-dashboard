import Clock from "../components/clock/Clock.jsx";
import Weather from "../components/weather/Weather.jsx";
import Todo from "../components/todo/Todo.jsx";
// import Fact from "../components/fact/Fact.jsx";
import MyNews from "../components/news/MyNews.jsx";
import Favorites from "../components/gutendex/Favorites.jsx";
import { NewsProvider } from "../context/NewsContext.jsx";
import MyTodos from "../components/todo/MyTodos.jsx";
import { TodoProvider } from "../context/TodoContext.jsx";
import Overview from "../components/overview/Overview.jsx";

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
      id: "overview",
      title: "Overview",
      component: Overview,
    },
    {
      id: "mynews",
      title: "My News",
      component: MyNews,
    },

    {
      id: "todo",
      title: "My Tasks",
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
        return (
          <NewsProvider>
            <MyNews />
          </NewsProvider>
        );
      case "overview":
        return <Overview />;
      case "todo":
        return (
          <TodoProvider>
            <MyTodos />
          </TodoProvider>
        );

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
              <header className="widget-header">
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
