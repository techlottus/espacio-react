import React, { useEffect, useState } from "react";
import { notiObs, notiObsClose } from "../../observables/notificationObs";
import "./Notification.scss";
import { Feedback } from "../Feedback/Feedback";
import { feedbackNoti } from "../../constants/Notification.constant";

const Notification = () => {
  const [items, setItems] = useState([]);

  const handleItem = (data) => {
    return (
      <div className="notiitem" key={data.id}>
        <Feedback
          isNoti={true}
          data={{
            ...feedbackNoti,
            left: {
              name: data.icon,
              status: data.type,
            },
          }}
          text={data.text}
          html={() => {return}}
          onRight={() => {
            notiObsClose.next(data.id);
          }}
        />
      </div>
    );
  };

  const handleItems = () => {
    return (
      <div className="notiitems">
        {items.map((item) => {
          return handleItem(item);
        })}
      </div>
    );
  };

  useEffect(() => {
    notiObsClose.subscribe((id) => {
      setItems((items) => {
        return items.filter((item) => item.id !== id);
      });
    });

    notiObs.subscribe((info) => {
      let id = new Date().getTime();
      let timer = setTimeout(() => {
        setItems((items) => {
          return items.filter((item) => item.id !== id);
        });
        clearTimeout(timer);
      }, 60000);
      setItems((items) => {
        if (items.length === 3) {
          items.pop();
        }
        let newItems = [
          {
            icon: info.type.icon,
            type: info.type.type,
            text: info.text,
            id,
          },
          ...items,
        ];
        return newItems;
      });
    });
  }, []);

  return (
    <>
      <div className="noti-container">{handleItems()}</div>
    </>
  );
};

export default Notification;
