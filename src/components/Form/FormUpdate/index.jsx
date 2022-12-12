import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";

import { read, remove, update } from "../../../features/user/userSlice";
import { favourites, schools, genders } from "../../../data";
import { schemaUser } from "../../../utils/schemaYup";

import styles from "./FormUpdate.module.css";
import {
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  Switch,
  Checkbox,
  Typography,
  message,
  Popconfirm,
  Spin,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Title, Text } = Typography;

const FormUpdate = () => {
  const { isLoading, user, errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const {
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schemaUser),
    defaultValues: { isGraduate: false },
  });

  const onSubmit = (data) => {
    try {
      data.dateOfBirth = Date.parse(data.dateOfBirth);
      dispatch(update(data));
      messageApi.open({
        type: "success",
        content: "This is a success message",
      });
      navigate("/");
    } catch (error) {
      messageApi.open({
        type: "error",
        content: errorMessage,
      });
    }
  };

  const handleRemove = (id) => {
    try {
      dispatch(remove(id));
      messageApi.open({
        type: "success",
        content: "This is a success message",
      });
      navigate("/");
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error,
      });
    }
  };

  useEffect(() => {
    dispatch(read(id));
    if (user)
      reset({
        ...user,
        dateOfBirth: moment(
          moment(new Date(user.dateOfBirth)).format("YYYY-MM-DD"),
          "YYYY-MM-DD"
        ),
      });
  }, []);
  return (
    <Spin spinning={isLoading}>
      {contextHolder}
      <Title>Detail User</Title>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formUser}>
        <div className={styles.formGroup}>
          <label className={styles.label}>First Name</label>
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="First Name"
                status={errors.firstName ? "error" : ""}
              />
            )}
          />
          <Text type="danger">{errors.firstName?.message}</Text>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Last Name</label>
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Last Name"
                status={errors.lastName ? "error" : ""}
              />
            )}
          />
          <Text type="danger">{errors.lastName?.message}</Text>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Phone</label>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                placeholder="Phone"
                status={errors.phone ? "error" : ""}
              />
            )}
          />
          <Text type="danger">{errors.phone?.message}</Text>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Email"
                status={errors.email ? "error" : ""}
              />
            )}
          />
          <Text type="danger">{errors.email?.message}</Text>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>School</label>
          <Controller
            control={control}
            name="school"
            render={({ field }) => (
              <Select
                {...field}
                style={{ width: "100%" }}
                defaultValue="Select School"
                status={errors.school ? "error" : ""}
              >
                {schools.map((school) => (
                  <Select.Option key={school.name} value={school.value}>
                    {school.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
          <Text type="danger">{errors.school?.message}</Text>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Address</label>
          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Address"
                status={errors.address ? "error" : ""}
              />
            )}
          />
          <Text type="danger">{errors.address?.message}</Text>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Gender</label>
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <Radio.Group
                value={value}
                onChange={(e) => onChange(e.target.value)}
                status={errors.gender ? "error" : ""}
              >
                {genders.map((gender) => (
                  <Radio key={gender.name} value={gender.value}>
                    {gender.name}
                  </Radio>
                ))}
              </Radio.Group>
            )}
          />
          <Text type="danger">{errors.gender?.message}</Text>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Favourites</label>
          <Controller
            control={control}
            name="favourites"
            render={({ field }) => (
              <Checkbox.Group
                options={favourites}
                {...field}
                status={errors.favourites ? "error" : ""}
              />
            )}
          />
          <Text type="danger">{errors.favourites?.message}</Text>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>DateOfBirth</label>
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field }) => (
              <DatePicker
                {...field}
                style={{ width: "fit-content" }}
                status={errors.dateOfBirth ? "error" : ""}
              />
            )}
          />
          <Text type="danger">{errors.dateOfBirth?.message}</Text>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>isGraduate</label>
          <Controller
            control={control}
            name="isGraduate"
            render={({ field: { value, onChange } }) => (
              <Switch
                onChange={onChange}
                checked={value}
                style={{ width: "fit-content" }}
                status={errors.isGraduate ? "error" : ""}
              />
            )}
          />
          <Text type="danger">{errors.isGraduate?.message}</Text>
        </div>
        <div className={styles.groupBtn}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!isValid}
            style={{ width: "fit-content" }}
          >
            Submit
          </Button>
          <Popconfirm
            placement="top"
            title="Are you sure to delete this user?"
            onConfirm={() => handleRemove(id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      </form>
    </Spin>
  );
};
export default FormUpdate;
