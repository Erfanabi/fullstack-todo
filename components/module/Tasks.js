import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { RiMastodonLine } from "react-icons/ri";

function Tasks({ data, next, back }) {
  const router = useRouter();

  const changeStatus = (id, status) => {
    axios
      .patch("/api/todo", { id, status })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          toast.success("operation was successful");
          router.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="tasks">
      {data?.map((item) => {
        return (
          <div key={item._id} className="tasks__card">
            <span className={item.status}></span>
            <RiMastodonLine />
            <h4>{item.title}</h4>
            <div>
              {back ? (
                <button
                  className="button-back"
                  onClick={() => changeStatus(item._id, back)}
                >
                  <BiLeftArrow />
                  Back
                </button>
              ) : null}
              {next ? (
                <button
                  className="button-next"
                  onClick={() => changeStatus(item._id, next)}
                >
                  Next
                  <BiRightArrow />
                </button>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Tasks;
