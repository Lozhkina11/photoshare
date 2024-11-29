import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { usePhotoContext } from "./context/Photos";
import { useUIContext } from "@/modules/ui/components/context/Ui"; // Импорт контекста для модальных окон
import { Card, Col, Popconfirm, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { ModalType } from "@/modules/ui/types";

const PhotoGrid = () => {
  const { photos, removePhoto } = usePhotoContext();
  const { showModal } = useUIContext(); // Получаем функцию showModal из UIContext
  console.log(photos);
  
  return (
    <div
      style={{
        padding: "16px", // Отступы вокруг карточек
        display: "flex",
        justifyContent: "center", // Центрирование карточек
      }}
    >
      <Row
        gutter={[16, 16]} // Пространство между карточками
        style={{
          width: "100%",
          maxWidth: "1200px", // Максимальная ширина сетки
        }}
        justify="start" // Выравнивание карточек в начале строки
      >
        {photos.map((photo) => (
          <Col key={photo.id} xs={24} sm={12} md={8} lg={8}>
            <Card
              style={{
                width: "100%",
              }}
              cover={
                <img
                  src={photo.file}
                  alt={photo.title}
                  className="max-h-full max-w-full object-contain"
                />
              }
              actions={[
                <EditOutlined
                  key="edit"
                  onClick={() =>
                    showModal({
                      type: ModalType.editPhoto,
                      params: { photo },
                    })
                  }
                />,
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  okText="Yes"
                  cancelText="No"
                  key="delete"
                  onConfirm={() => removePhoto(photo.id)}
                >
                  <DeleteOutlined />
                </Popconfirm>,
              ]}
            >
              <Meta description={photo.description || "Нет описания"} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PhotoGrid;
