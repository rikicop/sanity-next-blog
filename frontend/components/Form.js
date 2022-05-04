import styled from "styled-components";
import { useForm } from "react-hook-form";

const FormBox = styled.div`
  display: flex;
  background-color: white;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  width: 100%;
  height: 100%;
  margin-right: 5%;
  margin-left: 5%;
  padding: 20px;
  form {
    input,
    textarea {
      display: block;
      width: 100%;
      padding: 0.5rem 0.8rem 0.5rem 0.8rem;
      margin: 0.9vw 0;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 20px;
      box-shadow: 5px 3px 2px 1px rgba(0 0 0 / 66%);
    }
    .formBtn {
      margin: 1rem 0 1rem 0;
      border-radius: 10px;
      background-color: rgb(232, 187, 23);

      :hover {
        background-color: #0b8232;
        transition: 1s background ease;
      }
    }
  }
`;

export const Form = ({ _id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify({ ...data, _id }),
    });
    console.log(data);
  };

  return (
    <FormBox>
      <h5 style={{ color: "rgb(232, 187, 23)" }}>Te gustó el post?</h5>
      <h3> Deja un comentario </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label> Name </label>
        <input className="name" {...register("name", { required: true })} />
        {errors.name && <p>Debe llenar este campo.</p>}
        <label> Comment </label>
        <textarea
          className="comment"
          {...register("text", { required: true })}
        />
        {errors.text && <p>Text is required.</p>}

        <input className="formBtn" type="submit" />
      </form>
    </FormBox>
  );
};
