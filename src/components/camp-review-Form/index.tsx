import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import "./styles.css";
import { Button } from "../button";
import { ReactComponent as Star } from "../../assets/star.svg";
import { ReactComponent as StarFill } from "../../assets/starFill.svg";
import { useParams } from "react-router-dom";
import { getCampgroundByid, postReview } from "../../utils/helperFunctions";
import { campTypes } from "../../types";
import { useAppSelector } from "../../store/hooks";
import { ErrorMassage } from "../error-massage";

type propsTypes = {
  setCamp: (camp: campTypes) => void;
};

export const CampReviewForm = ({ setCamp }: propsTypes) => {
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [error, setError] = useState<null | string>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { id } = useParams();

  const user = useAppSelector((store) => store.user.user);

  const RatingNumberHandler = (index: number) => {
    return () => {
      setRating(index + 1);
    };
  };

  const onChangeHandle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setReview(e.currentTarget.value);
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current?.checkValidity()) {
      e.stopPropagation();
      formRef.current?.classList.add("was-validated");
    } else {
      try {
        if (user?._id) {
          await postReview(id, {
            rating,
            body: review,
            author: user!._id,
          });
          const camp = await getCampgroundByid(id);
          setCamp(camp);
        } else {
          setError("you need to register to post review");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form
      className="camp-review-form"
      noValidate
      ref={formRef}
      onSubmit={onSubmitHandler}
    >
      {error && <ErrorMassage massage={error} onClick={() => setError(null)} />}
      <h2>Leave a Review</h2>
      <p>Rating</p>
      {Array.from(Array(5)).map((star, i) => {
        if (i + 1 <= rating) {
          return (
            <StarFill
              key={i}
              className="star"
              fill="gold"
              onClick={RatingNumberHandler(i)}
            />
          );
        } else {
          return (
            <Star
              key={i}
              className="star"
              fill="gray"
              onClick={RatingNumberHandler(i)}
            />
          );
        }
      })}
      <p>Review</p>
      <textarea onChange={onChangeHandle} required className="form-control" />
      <Button title="Submit" color="green" type="submit" />
    </form>
  );
};
