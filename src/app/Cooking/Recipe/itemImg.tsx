"use client";

// React 관련 요소
import React, { useCallback, useEffect, useState, PureComponent } from "react";
import Image from "next/image";

import { RecipeColumn, ColumnsRecipe } from "@/types";

// 드래그
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
//
import dragIcon01 from "/public/images/drag_icon_01.png";
import noImgFile from "/public/images/no_img.png";

interface Props {
  children: object;
  name: any;
  index: number;
  list: any;
  handleChangeValue: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    list: any,
    formKey: string,
    index: number
  ) => void;
  handleDelButtonClick: (
    e: React.MouseEvent,
    formKey: keyof ColumnsRecipe,
    index: number
  ) => void;
  saveImgFile: (file: File, list: any, formKey: string) => void;
}

const ItemImg = ({
  name,
  index,
  list,
  handleChangeValue,
  handleDelButtonClick,
  saveImgFile,
}: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: name.id });

  let noImg = noImgFile.src;
  const ImgFileSource = (imgFile: File) => {
    if (imgFile?.name) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result) {
          setImgFileSrc(result as string);
        }
      };
      reader.readAsDataURL(imgFile);
    } else {
      setImgFileSrc(noImg);
    }
  };

  const [imgFileSrc, setImgFileSrc] = useState<string>(noImg);

  console.log(name);
  useEffect(() => {
    ImgFileSource(name?.imgFile);
  }, [name?.imgFile]);
  return (
    <div
      className="DragHandle flex_between "
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        padding: "10px 0",
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? "100" : undefined,
      }}
    >
      <span className=" btn btn_default btn_s">
        <Image src={dragIcon01} alt="드래그아이콘" priority />
      </span>
      {/* <input type="text" /> */}
      <span>{name?.title}</span>

      <div className="flex_between width_100">
        <label className="flex_between" htmlFor={name?.id}>
          <div
            style={{ width: "320px", height: "214px" }}
            className={imgFileSrc === noImg ? "default_image" : ""}
          >
            <Image
              src={imgFileSrc}
              alt="조리이미지"
              priority
              width={320}
              height={214}
            />
          </div>
        </label>
        <input
          className="file_custom"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e?.target?.files?.[0];
            if (file) {
              saveImgFile(file, name, list?.formKey);
            }
          }}
          type={name?.type}
          accept="image/*"
          id={name?.id}
        />
        <textarea
          id={list?.id}
          maxLength={500}
          placeholder="조리 방법을 입력해주세요."
          onChange={(e) => {
            handleChangeValue(e, name, list.formKey, index);
          }}
        ></textarea>
        <button
          onClick={(e) => {
            handleDelButtonClick(e, list?.formKey, index);
          }}
          className="btn btn_primary"
          style={{ width: "80px" }}
          disabled={list?.data.length === 1 ? true : false}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default ItemImg;
