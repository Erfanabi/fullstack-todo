import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";

function ProfilePage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/api/profile");
      if (res.data.status === "success") {
        setName(res?.data?.data?.name);
        setLastName(res?.data?.data?.lastName);
      }
    } catch (error) {}
  };

  const submitHandler = async () => {
    try {
      const res = await axios.post("/api/profile", {
        name,
        lastName,
        password,
      });
      console.log(res.data);
      toast.success("update profile");
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="profile-form">
      <h2>
        <CgProfile />
        Profile
      </h2>

      <div className="profile-form__input">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="last-name">Last Name:</label>
          <input
            id="last-name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={submitHandler} style={{ marginTop: "40px" }}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
