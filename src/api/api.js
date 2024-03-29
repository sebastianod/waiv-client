import { WaveContext } from "../context/wave.context";
import { useContext } from "react";

export const useSendReceiveData = () => {
  const { setIsLoading } = useContext(WaveContext);

  //-------function for sending-receiving data-------//
  const sendReceiveData = async (data, setterFunction) => {
    setIsLoading(true);
    const response = await fetch(
      "https://waiv-server.onrender.com/api/getwave",
      {
        //use api route for any api related task
        method: "POST",
        headers: {
          "Content-Type": "application/json", //tell flask what type of data is incoming
        },
        body: JSON.stringify(data), //the actual outgoing data in JSON format
      }
    );
    const response_data = await response.json(); // obtain the response data. comes in as {svg: encoded_svg}, where encoded_svg is in string, the whole thing is in json.
    const encoded_svg = response_data.svg; // type: string, base64. Destructure the encoded SVG from our response. It's a string that was encoded from base64.
    const decoded_svg = atob(encoded_svg); // type: string, svg-xml. The atob() function decodes a string of data which has been encoded using Base64 encoding.
    setterFunction(decoded_svg); // type: string. Set the binary data as the SVG source
    // console.log(typeof(decoded_svg))
    setIsLoading(false);
  };

  return sendReceiveData;
};
