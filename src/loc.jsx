import React, { useState, useEffect } from "react";
import PocketBase from "pocketbase";
import styled from "styled-components";

const CreatePage = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [currentLatitude, setCurrentLatitude] = useState("");
  const pb = new PocketBase("https://linkify.pockethost.io");
  const [currentLongitude, setCurrentLongitude] = useState("");

  useEffect(() => {
    // Get the current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLatitude(position.coords.latitude);
        setCurrentLongitude(position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const setCurr = async () => {
    const data = {
      lang: currentLatitude,
      long: currentLongitude,
    };
    const record = await pb
      .collection("client")
      .update("lr5n43fwme46jbn", data);

    // Process the latitude and longitude values
    console.log("Latitude:", currentLatitude, "Longitude:", currentLongitude);

    // Reset the inputs
    setLatitude("");
    setLongitude("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      lang: latitude,
      long: longitude,
    };
    const record = await pb
      .collection("client")
      .update("lr5n43fwme46jbn", data);

    // Process the latitude and longitude values
    console.log("Latitude:", latitude, "Longitude:", longitude);

    // Reset the inputs
    setLatitude("");
    setLongitude("");
  };

  return (
    <Wrapper>
      <h1>Sixth Sense Client</h1>
      <Form onSubmit={handleSubmit}>
        <InputField>
          <label htmlFor="latitude">Latitude:</label>
          <Input
            type="text"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </InputField>
        <InputField>
          <label htmlFor="longitude">Longitude:</label>
          <Input
            type="text"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </InputField>
        <Button type="submit">Submit</Button>
      </Form>
      <CurrentLocation>
        <h2>Current Location:</h2>
        <p>Latitude: {currentLatitude}</p>
        <p>Longitude: {currentLongitude}</p>
        <Button onClick={() => setCurr()}>Set Current</Button>
      </CurrentLocation>
    </Wrapper>
  );
};

export default CreatePage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f4f4f4;
  font-family: Arial, sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const CurrentLocation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;
