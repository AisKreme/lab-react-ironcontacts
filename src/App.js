import contacts from "./contacts.json";
import { useState } from "react";

function App() {
  // --- first five contacts ---
  let firstFive = contacts.slice(0, 5);

  // --- use State ---
  let [allContacts, setContacts] = useState(firstFive);

  // --- add contact ---
  let handleAdd = () => {
    let random = contacts[Math.floor(Math.random() * contacts.length)];
    setContacts([random, ...allContacts]);
  };

  // --- sort by name ---
  let handleSortName = () => {
    let clone = JSON.parse(JSON.stringify(allContacts));
    clone.sort((first, second) => {
      if (first.name > second.name) {
        return 1;
      } else if (first.name < second.name) {
        return -1;
      } else {
        return 0;
      }
    });

    setContacts(clone);
  };

  // --- sort by popularity ---
  let handleSortPopularity = () => {
    let clone = JSON.parse(JSON.stringify(allContacts));
    clone.sort((first, second) => {
      if (first.popularity > second.popularity) {
        return -1;
      } else if (first.popularity < second.popularity) {
        return 1;
      } else {
        return 0;
      }
    });

    setContacts(clone);
  };

  // --- delete Contact ---
  let handleDelete = (id) => {
    let filteredContacts = allContacts.filter((elem) => {
      return elem.id !== id;
    });

    setContacts(filteredContacts);
  };

  return (
    <div>
      <button onClick={handleAdd}>Add Random Contact</button>
      <button onClick={handleSortName}>Sort Name</button>
      <button onClick={handleSortPopularity}>Sort Popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {allContacts.map((elem, index) => {
            return (
              <tr key={`${elem.id} ${index}`}>
                <td>
                  <img src={elem.pictureUrl} alt="actors" />
                </td>
                <td>{elem.name}</td>
                <td>{elem.popularity.toFixed(2)}</td>
                <td>{elem.wonOscar && "🏆"}</td>
                <td>{elem.wonEmmy && "⭐"}</td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(elem.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
