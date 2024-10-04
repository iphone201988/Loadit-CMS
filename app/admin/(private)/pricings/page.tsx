"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { getPricings, updatePricings } from "@/actions/pricings";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";

const formSchema = z.object({
  small: z.number().nullable(),
  medium: z.number().nullable(),
  large: z.number().nullable(),
  largeBase: z.number().nullable(),
  superLarge: z.number().nullable(),
  superLargeBase: z.number().nullable(),
  commission: z.number().nullable(),
  tax: z.number().nullable(),
});

const Pricings = () => {
  const [showLoader, setShowLoader] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      small: null,
      medium: null,
      large: null,
      largeBase: null,
      superLarge: null,
      superLargeBase: null,
      commission: null,
      tax: null,
    },
  });

  const { reset, control, handleSubmit } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const {
      small,
      medium,
      large,
      largeBase,
      superLarge,
      superLargeBase,
      commission,
      tax,
    } = values;
    if (
      small == 0 ||
      medium == 0 ||
      large == 0 ||
      largeBase == 0 ||
      superLarge == 0 ||
      superLargeBase == 0 ||
      commission == 0 ||
      tax == 0
    ) {
      toast.error("Zero is not allowed for any value");
      return;
    }

    const numericValues: any = {};

    if (small) numericValues.small = small;
    if (medium) numericValues.medium = medium;
    if (large) numericValues.large = large;
    if (largeBase) numericValues.largeBase = largeBase;
    if (superLarge) numericValues.superLarge = superLarge;
    if (superLargeBase) numericValues.superLargeBase = superLargeBase;
    if (commission) numericValues.commission = commission;
    if (tax) numericValues.tax = tax;

    if (Object.keys(numericValues).length) {
      setShowLoader(true);
      const response = await updatePricings(numericValues);
      setShowLoader(false);
      if (response.status == 200) {
        toast.success(response.message);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const response = await getPricings();
      setShowLoader(false);
      if (response.status === 200 && response.pricings) {
        reset({
          small: response.pricings.small ?? null,
          medium: response.pricings.medium ?? null,
          large: response.pricings.large ?? null,
          largeBase: response.pricings.largeBase ?? null,
          superLarge: response.pricings.superLarge ?? null,
          superLargeBase: response.pricings.superLargeBase ?? null,
          commission: response.pricings.commission ?? null,
          tax: response.pricings.tax ?? null,
        });
      }
    })();
  }, [reset]);

  return (
    <div className="h-full w-full">
      {showLoader && (
        <div className="fixed inset-0 z-10 bg-white opacity-70"></div>
      )}
      <div className="h-full w-full flex justify-center items-center">
        <Card className="w-full border-none shadow-none">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <CardHeader>
                <CardTitle className="text-4xl">Manage Pricings</CardTitle>
                <CardDescription>Update all pricings</CardDescription>
              </CardHeader>
              <CardContent className="w-full">
                <div className="flex flex-col space-y-5">
                  <div className="flex space-x-5">
                    <div className="w-full">
                      <FormField
                        control={control}
                        name="commission"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Commission</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Commission"
                                {...field}
                                type="number"
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full">
                      <FormField
                        control={control}
                        name="tax"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tax</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Tax"
                                {...field}
                                type="number"
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-5">
                    <div className="w-full">
                      <FormField
                        control={control}
                        name="small"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pricing for Small lbs</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Small lbs"
                                {...field}
                                type="number"
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full">
                      <FormField
                        control={control}
                        name="medium"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pricing for Medium lbs</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Medium lbs"
                                {...field}
                                type="number"
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-5">
                    <div className="w-full">
                      <FormField
                        control={control}
                        name="large"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pricing for Large lbs</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Large lbs"
                                {...field}
                                type="number"
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full">
                      <FormField
                        control={control}
                        name="largeBase"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pricing for LargeBase lbs</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="LargeBase lbs"
                                {...field}
                                type="number"
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-5">
                    <div className="w-full">
                      <FormField
                        control={control}
                        name="superLarge"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pricing for Super Large lbs</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Super Large lbs"
                                {...field}
                                type="number"
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full">
                      <FormField
                        control={control}
                        name="superLargeBase"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Pricing for Super Large Base lbs
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Super Large Base lbs"
                                {...field}
                                type="number"
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Submit
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>

      {showLoader && (
        <div className="absolute left-[50%] top-[50%] z-20">
          <BeatLoader />
        </div>
      )}
    </div>
  );
};

export default Pricings;
