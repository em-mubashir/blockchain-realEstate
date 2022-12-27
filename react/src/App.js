import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import web3 from "./web3";
import realEstate from "./realEstate";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function App() {
  const [properties, setPropperties] = useState([]);
  const [accounts, setAccounts] = useState("");
  const [area, setArea] = useState(0);
  const [cnic, setCnic] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [address, setAddress] = useState("");
  let subtitle;

  const getProperties = async () => {
    const properties = await realEstate.methods.getProperties().call();
    const myAccounts = await web3.eth.getAccounts();
    setAccounts(myAccounts);
    setPropperties(properties);
  };

  useEffect(() => {
    getProperties();
  }, []);

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const createProperty = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await realEstate.methods.addProperty(area, cnic).send({
      from: accounts[0],
      gas: 6721975,
      gassPrice: 20000000000,
    });
  };

  const changeOwner = async () => {
    await realEstate.methods
      .changeOwner(currentIndex, address)
      .send({ from: accounts[0] });
  };

  const onChange = (e, index) => {
    e.preventDefault();
    setCurrentIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>RealEstate Blockchain App</h1>
      <table style={{ padding: "2rem" }}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Area</th>
            <th>Cnic</th>
            <th>Owner Address</th>
          </tr>
        </thead>
        <tbody>
          {properties.length > 0 &&
            properties.map((item, index) => (
              <tr key={"data" + index}>
                <td>{index + 1}</td>
                <td>{item.area}</td>
                <td>{item.cninc}</td>
                <td>{item.owner}</td>
                <td>
                  <button onClick={(e) => onChange(e, index)}>
                    Change Owner
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <hr />
      <form onSubmit={createProperty}>
        <h4>Add New Property</h4>
        <div>
          <label>Enter the area of property : </label>
          <input value={area} onChange={(e) => setArea(e.target.value)} />
        </div>
        <div>
          <label>Enter the Cnic Number : </label>
          <input value={cnic} onChange={(e) => setCnic(e.target.value)} />
        </div>
        <button>Add</button>
      </form>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
          Change Owner Address
        </h2>
        <form onSubmit={changeOwner}>
          <label>New Owner Address </label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} />
          <button>Confirm</button>
        </form>
      </Modal>
    </div>
  );
}

export default App;
