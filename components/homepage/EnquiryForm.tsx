import React, { useState } from "react";

import Input from "../common/Input";
import Typography from "../common/Typography";

import axios from "axios";
import actionsDirectory from "@/utils/functions/actionsDirectory";

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    price: 0,
    message: "",
  });
  const [disabled, setDisabled] = useState(false);

  const onClickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setDisabled(true);

    const response = await actionsDirectory("enquire", {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      price: formData.price,
    });

    if (response.success) {
      setFormData({
        name: "",
        email: "",
        price: 0,
        message: "",
      });

      setDisabled(false);
    }

    if (!response.success) {
      alert(response.error);
      setDisabled(false);
    }
  };

  return (
    <form
      onSubmit={onClickSubmit}
      className="flex flex-col w-1/2 xs:w-full gap-5 border p-5 rounded-lg bg-white shadow-lg"
    >
      <Typography type="heading" value="Enquire Now" />

      <div className="flex xs:flex-col gap-5 items-center w-full">
        <Input
          type="text"
          disabled={disabled}
          label="Name"
          required
          placeholder="eg: John Appleseed"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          type="email"
          disabled={disabled}
          label="Email"
          required
          placeholder="eg: john@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <Input
        type="text"
        disabled={disabled}
        label="Price (in USD)"
        required
        placeholder="eg: 120"
        value={formData.price}
        onChange={(e) => {
          const value = e.target.value;

          if (isNaN(Number(value))) {
            return;
          }

          setFormData({ ...formData, price: Number(value) });
        }}
      />

      <Input
        type="textarea"
        disabled={disabled}
        label="Message"
        required
        placeholder="How can I help you?"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />

      <Input type="submit" disabled={disabled} value="Enquire" />
    </form>
  );
};

export default EnquiryForm;
