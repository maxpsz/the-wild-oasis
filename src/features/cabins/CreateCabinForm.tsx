import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { CabinInput } from "../../types/types";
import FormRow from "../../ui/FormRow";

type FieldValues = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
};

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<FieldValues>();
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data: FieldValues) {
    const newCabin: CabinInput = {
      name: data.name,
      max_capacity: data.maxCapacity,
      regular_price: data.regularPrice,
      discount: data.discount,
      description: data.description,
      image: "",
    };

    mutate(newCabin);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" errorMessage={errors.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        errorMessage={errors.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        errorMessage={errors.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" errorMessage={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              const discount = +value;
              const regularPrice = +getValues("regularPrice");

              if (isNaN(regularPrice) || regularPrice === 0) return true;
              if (discount > regularPrice) {
                return "Discount should be less than regular price";
              }

              return true;
            },
            // value < +getValues("regularPrice") ||
            // "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        errorMessage={errors.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isCreating}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput disabled={isCreating} id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
