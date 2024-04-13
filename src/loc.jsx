import React, { useState, useEffect } from "react";
import PocketBase from "pocketbase";
import styled, { css, keyframes } from "styled-components";

const CreatePage = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [currentLatitude, setCurrentLatitude] = useState("");
  const [currentLongitude, setCurrentLongitude] = useState("");
  const [leftLatitude, setLeftLatitude] = useState(31.24674);
  const [leftLongitude, setLeftLongitude] = useState(75.704074);
  const [rightLatitude, setRightLatitude] = useState(31.353306);
  const [rightLongitude, setRightLongitude] = useState(75.5754);
  const [isLeftLoading, setIsLeftLoading] = useState(false);
  const [isCenterLoading, setIsCenterLoading] = useState(false);
  const [isCurrentLoading, setIsCurrentLoading] = useState(false);
  const [isRightLoading, setIsRightLoading] = useState(false);
  const pb = new PocketBase("https://linkify.pockethost.io");
  const id = 1;
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

  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        const result = await pb
          .collection("client")
          .getFirstListItem(`UID="${id}"`);
        console.log(result.status);
        if (result.status == 1) {
          alert("SOS activated" + " " + result.curlong + " " + result.curlang);
          const data = {
            curlong: 0,
            curlang: 0,
            status: 0,
          };
          const record = await pb
            .collection("client")
            .update("lr5n43fwme46jbn", data);
        }
      })();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const setCurr = async () => {
    setIsCurrentLoading(true);
    const data = {
      lang: currentLatitude,
      long: currentLongitude,
    };
    const record = await pb
      .collection("client")
      .update("lr5n43fwme46jbn", data);
    setIsCurrentLoading(false);

    // Process the latitude and longitude values
    console.log("Latitude:", currentLatitude, "Longitude:", currentLongitude);

    // Reset the inputs
    setLatitude("");
    setLongitude("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCenterLoading(true);
    const data = {
      lang: latitude,
      long: longitude,
    };
    const record = await pb
      .collection("client")
      .update("lr5n43fwme46jbn", data);
    setIsCenterLoading(false);

    // Process the latitude and longitude values
    console.log("Latitude:", latitude, "Longitude:", longitude);
    console.log(
      "Left Latitude:",
      leftLatitude,
      "Left Longitude:",
      leftLongitude
    );
    console.log(
      "Right Latitude:",
      rightLatitude,
      "Right Longitude:",
      rightLongitude
    );

    // Reset the inputs
    setLatitude("");
    setLongitude("");
  };

  const handleLeftSubmit = async () => {
    setIsLeftLoading(true);
    const data = {
      lang: leftLatitude,
      long: leftLongitude,
    };
    const record = await pb
      .collection("client")
      .update("lr5n43fwme46jbn", data);
    setIsLeftLoading(false);

    console.log(
      "Left Latitude:",
      leftLatitude,
      "Left Longitude:",
      leftLongitude
    );
  };

  const handleRightSubmit = async () => {
    setIsRightLoading(true);
    const data = {
      lang: rightLatitude,
      long: rightLongitude,
    };
    const record = await pb
      .collection("client")
      .update("lr5n43fwme46jbn", data);
    setIsRightLoading(false);

    console.log(
      "Right Latitude:",
      rightLatitude,
      "Right Longitude:",
      rightLongitude
    );
  };

  return (
    <Wrapper>
      <h1>Sixth Sense Client</h1>
      <CardsContainer>
        <Card>
          <h2>BH-5 HOSTEL</h2>
          <p>Latitude: {leftLatitude}</p>
          <p>Longitude: {leftLongitude}</p>
          <Button onClick={handleLeftSubmit} isLoading={isLeftLoading}>
            Set Hostel
          </Button>
        </Card>
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
          <Button type="submit" isLoading={isCenterLoading}>
            Set
          </Button>
        </Form>
        <Card>
          <h2>Jalandhar</h2>
          <p>Latitude: {rightLatitude}</p>
          <p>Longitude: {rightLongitude}</p>
          <Button onClick={handleRightSubmit} isLoading={isRightLoading}>
            Set Jalandhar
          </Button>
        </Card>
      </CardsContainer>
      <CurrentLocation>
        <h2>Current Location:</h2>
        <p>Latitude: {currentLatitude}</p>
        <p>Longitude: {currentLongitude}</p>
        <Button onClick={() => setCurr()} isLoading={isCurrentLoading}>
          Set Current
        </Button>
      </CurrentLocation>
      <br />
      <div style={{ width: "100%" }}>
        <iframe
          width="100%"
          height="600"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=31.2445781,75.7022453+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
          <a href="https://www.gps.ie/">gps trackers</a>
        </iframe>
      </div>
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

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
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

const spin = keyframes`
  from { transform: rotate(0deg); } 
  to { transform: rotate(360deg); }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: black;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.isLoading &&
    css`
      pointer-events: none;
      &:after {
        content: "";
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-left: 8px;
        border: 2px solid white;
        border-top-color: transparent;
        border-radius: 50%;
        animation: ${spin} 0.8s linear infinite;
      }
    `}

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
