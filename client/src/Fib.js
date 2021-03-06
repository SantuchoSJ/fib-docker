import axios from "axios";
import { useEffect, useState } from "react";

export default function Fib() {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  const fetchValues = async () => {
    try {
      const values = await axios.get("/api/values/current");
      setValues(values.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchIndexes = async () => {
    try {
      const seenIndexes = await axios.get("/api/values/all");
      setSeenIndexes(seenIndexes.data);
    } catch (e) {
      console.log(e);
    }
  };

  const renderSeenIndexes = () => {
    seenIndexes.map(({ number }) => number).join(", ");
  };

  const renderValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/values", { index });

      setIndex("");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input value={index} onChange={(e) => setIndex(e.target.value)} />
        <button>Submit</button>
      </form>
      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated values:</h3>
      {renderValues()}
    </div>
  );
}
