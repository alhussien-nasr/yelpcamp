import React from "react";
import { reviewTypes } from "../../types";
import { useAppSelector } from "../../store/hooks";
import { Button } from "../button";
import { ReactComponent as Star } from "../../assets/star.svg";
import { ReactComponent as StarFill } from "../../assets/starFill.svg";
import "./styles.css";
type propsType = { item: reviewTypes; onClick: () => void };
const CampReviewCard = ({ item, onClick }: propsType) => {
  const user = useAppSelector((store) => store.user.user);

  return (
    <div className="review-body">
      <h5>
        Rating:
        {Array.from(Array(5)).map((star, i) => {
          if (i + 1 <= item.rating) {
            return (
              <StarFill
                key={i}
                className="star"
                fill="gold"
              />
            );
          } else {
            return <Star key={i} className="star" fill="gray" />;
          }
        })}
      </h5>

      <p>by: {item.author.username}</p>
      <p> Review:{item.body}</p>
      {item.author._id == user?._id && (
        <Button title={"delete"} color={"red"} onClick={onClick} />
      )}
    </div>
  );
};

export default CampReviewCard;
