"use client";
import { useEffect, useState } from "react";
import { CookingPost, ColumnsRecipe } from "@/types";

const StarScore = ({
  score,
  data,
  setData,
  page,
}: {
  score: number;
  data: any;
  setData: any;
  page: string;
}) => {
  const handleStar = (index: number) => {
    console.log(index);
    let score = index + 1;
    if (page === "insert") {
    }
  };
  return (
    <div>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <span
            key={index + 1}
            onClick={() => {
              handleStar(index);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
            >
              <path
                d="M10.51 0L14.01 6.224L21.02 7.636L16.19 12.908L17.007 20L10.507 17.024L4.014 20L4.83 12.908L0 7.636L7.007 6.224L10.51 0Z"
                fill={score < index + 1 ? "#6B7583" : "red"}
              />
            </svg>
          </span>
        ))}
    </div>
  );
};

export default StarScore;
