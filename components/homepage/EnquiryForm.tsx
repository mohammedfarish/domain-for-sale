import React, { useState } from "react";

import Input from "../common/Input";
import Typography from "../common/Typography";

import actionsDirectory from "@/utils/functions/actionsDirectory";

const EnquiryForm = () => {
  const [intent, setIntent] = useState<"enquire" | "enquire-success">("enquire");
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
      setIntent("enquire-success");
      setDisabled(false);
    }

    if (!response.success) {
      alert(response.error);
      setDisabled(false);
    }
  };

  return (
    <div className="flex flex-col w-1/2 xs:w-full gap-5 border p-5 rounded-lg bg-white shadow-lg">
      {intent === "enquire" && (
        <form onSubmit={onClickSubmit} className="flex flex-col gap-5 w-full">
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
      )}

      {intent === "enquire-success" && (
        <div className="flex flex-col gap-5 w-full items-center text-center select-none">
          <svg
            className="w-60 fill-green-500"
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm0 1.5c-4.69 0-8.498 3.807-8.498 8.497s3.808 8.498 8.498 8.498 8.497-3.808 8.497-8.498-3.807-8.497-8.497-8.497zm-5.049 8.886 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z"
              fillRule="nonzero"
            />
          </svg>

          <Typography type="heading" value="Enquiry Sent" />

          <span>Please wait white someone from our team looks into your enquiry and get back to you on your email[{formData.email}].</span>
        </div>
      )}
    </div>
  );
};

export default EnquiryForm;
