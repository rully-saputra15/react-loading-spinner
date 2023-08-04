import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { CircleLoader } from "react-spinners";

type Data = {
  taxonid: string;
  category: string;
  scientific_name: string;
  phylum_name: string;
};
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);

  const handleFetchData = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(
      "http://apiv3.iucnredlist.org/api/v3/species/page/0?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee",
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const data = await response.json();

      setData(data.result.slice(0, 20)); // Only use 20 items
    } else {
      console.log("Error");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    handleFetchData();
  }, []);

  const renderData = useCallback(() => {
    const components: JSX.Element[] = [];

    data.forEach((item: Data) => {
      components.push(
        <div className="card" key={item.taxonid}>
          {item.scientific_name}
        </div>
      );
    });

    return components;
  }, [data]);

  if (isLoading) {
    return (
      <div className="main-container">
        <CircleLoader loading={isLoading} color="#0E2954" className="loader" />
      </div>
    );
  } else {
    return (
      <section className="main-container">
        <h2>IUCN Red List</h2>
        <div className="card-list-container">{renderData()}</div>
      </section>
    );
  }
};

export default App;
