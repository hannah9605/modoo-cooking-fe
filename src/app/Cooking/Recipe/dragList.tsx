"use client";
import React, { Dispatch, useEffect, useState, SetStateAction } from "react";
import Item from "./item";
import ItemImg from "./itemImg";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensors,
  useSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { RecipeColumn, ColumnsRecipe } from "@/types";

type propList = {
  formKey: string;
  data: any;
  insertData: ColumnsRecipe;
  setInsertData: Dispatch<SetStateAction<ColumnsRecipe>>;
};

interface Props {
  list: propList;
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

const DragList = ({
  list,
  handleChangeValue,
  handleDelButtonClick,
  saveImgFile,
}: Props) => {
  const [data, setData] = useState(list?.data);
  const [active, setActive] = useState<object | null>(null);

  let formKey = list?.formKey;
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    const update = {
      ...active,
      activeIndex: active?.data?.current?.sortable?.index,
    };
    setActive(update);
  };

  const handleDragEnd = ({ over }: DragEndEvent) => {
    if (over && active) {
      if (list.formKey === "foodImgList") {
        const activeIndex = data.findIndex((item) => item === active.id);

        const overIndex = data.findIndex((item) => {
          return item === over.id;
        });
        const updatedColumn: RecipeColumn[] = arrayMove(
          data,
          activeIndex,
          overIndex
        );
        const updatedInsertColumns: ColumnsRecipe = {
          ...list?.insertData,
        };
        updatedInsertColumns[formKey] = updatedColumn;
        list.setInsertData(updatedInsertColumns);
        setData(updatedColumn);
      } else {
        const activeIndex = active?.activeIndex;
        const overIndex = over?.data?.current?.sortable?.index;
        const updatedColumn: RecipeColumn[][] = arrayMove(
          data,
          activeIndex,
          overIndex
        );
        const updatedInsertColumns: ColumnsRecipe = {
          ...list?.insertData,
        };

        if (formKey !== undefined) {
          updatedInsertColumns[formKey] = updatedColumn;
        } else {
          // formKey가 undefined일 때의 처리
        }
        list.setInsertData(updatedInsertColumns);

        setData(updatedColumn);
      }
    }

    setActive(null);
  };

  useEffect(() => {
    setData(list?.data);
  }, [list]);

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        id={"unique-dnd-context-id"}
      >
        <ul className="drag_list">
          <SortableContext items={data}>
            {list?.formKey === "foodImgList" ? (
              <>
                {data?.map((obj: object, i: number) => (
                  <li key={i} className="flex_start">
                    <Item
                      list={list}
                      handleChangeValue={handleChangeValue}
                      saveImgFile={saveImgFile}
                      handleDelButtonClick={handleDelButtonClick}
                      name={obj}
                      index={i}
                    >
                      {obj}
                    </Item>
                  </li>
                ))}
              </>
            ) : (
              <>
                <li className="flex_start drag_subtitle">
                  <span style={{ width: "calc(51.75% + 70px)" }}>
                    {formKey === "cookingUtensils" ? "도구 명" : "종류"}
                  </span>
                  <span className="measure">
                    {formKey === "cookingUtensils" ? "설명" : "계량"}
                  </span>
                </li>
                {data?.map((obj: object, i: number) => (
                  <li key={i} className="flex_start">
                    <Item
                      list={list}
                      handleChangeValue={handleChangeValue}
                      handleDelButtonClick={handleDelButtonClick}
                      saveImgFile={saveImgFile}
                      name={obj}
                      index={i}
                    >
                      {obj}
                    </Item>
                  </li>
                ))}
              </>
            )}
          </SortableContext>
        </ul>
      </DndContext>
    </>
  );
};

export default DragList;
