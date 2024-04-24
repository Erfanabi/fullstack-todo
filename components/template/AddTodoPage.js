import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { GrAddCircle } from "react-icons/gr";
import { MdDoneAll } from "react-icons/md";
import RadioButton from "../element/RadioButton";

function AddTodoPage() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");

  const addHandler = async () => {
    try {
      const res = await axios.post("/api/todo", { title, status });
      console.log(res.data);
      toast.success(res.data.message);
      if (res.data.status === "success") {
        setTitle("");
        setStatus("todo");
      }
    } catch (err) {
      console.log(err.response.data);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="add-form">
      <h2>
        <GrAddCircle />
        Add New Todo
      </h2>
      <div className="add-form__input">
        <div className="add-form__input--first">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="add-form__input--second">
          <RadioButton
            status={status}
            setStatus={setStatus}
            value="todo"
            title="Todo"
          >
            <BsAlignStart />
          </RadioButton>

          <RadioButton
            status={status}
            setStatus={setStatus}
            value="inProgress"
            title="In Progress"
          >
            <FiSettings />
          </RadioButton>

          <RadioButton
            status={status}
            setStatus={setStatus}
            value="review"
            title="Review"
          >
            <AiOutlineFileSearch />
          </RadioButton>

          <RadioButton
            status={status}
            setStatus={setStatus}
            value="done"
            title="Done"
          >
            <MdDoneAll />
          </RadioButton>
        </div>
        <button onClick={addHandler} style={{ marginTop: "40px" }}>
          Add
        </button>
      </div>
    </div>
  );
}

export default AddTodoPage;

{/* <div className="todo">
<label htmlFor="radio-item-1">
  <BsAlignStart />
  todo
</label>
<input
  id="radio-item-1"
  name="radio-item-1"
  type="radio"
  value="todo"
  onChange={handleRadioChange}
  checked={status === "todo"}
/>
</div>
<div className="inProgress">
<label htmlFor="radio-item-2">
  <FiSettings />
  inProgress
</label>
<input
  id="radio-item-2"
  name="radio-item-2"
  type="radio"
  value="inProgress"
  onChange={handleRadioChange}
  checked={status === "inProgress"}
/>
</div>
<div className="review">
<label htmlFor="radio-item-3">
  <AiOutlineFileSearch />
  review
</label>
<input
  id="radio-item-3"
  name="radio-item-3"
  type="radio"
  value="review"
  onChange={handleRadioChange}
  checked={status === "review"}
/>
</div>
<div className="done">
<label htmlFor="radio-item-4">
  <MdDoneAll />
  done
</label>
<input
  id="radio-item-4"
  name="radio-item-4"
  type="radio"
  value="done"
  onChange={handleRadioChange}
  checked={status === "done"}
/>
</div> */}