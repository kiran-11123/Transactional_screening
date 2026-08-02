import mongoose from "mongoose";
declare const transaction_model: mongoose.Model<{
    sender_customer_id: string;
    receiver_customer_id: string;
    amount: number;
    country_origin: "USA" | "India" | "UK" | "Germany" | "France" | "Canada" | "Australia" | "Singapore" | "UAE" | "Brazil";
    country_destination: "USA" | "India" | "UK" | "Germany" | "France" | "Canada" | "Australia" | "Singapore" | "UAE" | "Brazil";
    result: string;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    sender_customer_id: string;
    receiver_customer_id: string;
    amount: number;
    country_origin: "USA" | "India" | "UK" | "Germany" | "France" | "Canada" | "Australia" | "Singapore" | "UAE" | "Brazil";
    country_destination: "USA" | "India" | "UK" | "Germany" | "France" | "Canada" | "Australia" | "Singapore" | "UAE" | "Brazil";
    result: string;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    sender_customer_id: string;
    receiver_customer_id: string;
    amount: number;
    country_origin: "USA" | "India" | "UK" | "Germany" | "France" | "Canada" | "Australia" | "Singapore" | "UAE" | "Brazil";
    country_destination: "USA" | "India" | "UK" | "Germany" | "France" | "Canada" | "Australia" | "Singapore" | "UAE" | "Brazil";
    result: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    sender_customer_id: string;
    receiver_customer_id: string;
    amount: number;
    country_origin: "USA" | "India" | "UK" | "Germany" | "France" | "Canada" | "Australia" | "Singapore" | "UAE" | "Brazil";
    country_destination: "USA" | "India" | "UK" | "Germany" | "France" | "Canada" | "Australia" | "Singapore" | "UAE" | "Brazil";
    result: string;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    sender_customer_id: string;
    receiver_customer_id: string;
    amount: number;
    country_origin: "USA" | "India" | "UK" | "Germany" | "France" | "Canada" | "Australia" | "Singapore" | "UAE" | "Brazil";
    country_destination: "USA" | "India" | "UK" | "Germany" | "France" | "Canada" | "Australia" | "Singapore" | "UAE" | "Brazil";
    result: string;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    sender_customer_id: string;
    receiver_customer_id: string;
    amount: number;
    country_origin: "USA" | "India" | "UK" | "Germany" | "France" | "Canada" | "Australia" | "Singapore" | "UAE" | "Brazil";
    country_destination: "USA" | "India" | "UK" | "Germany" | "France" | "Canada" | "Australia" | "Singapore" | "UAE" | "Brazil";
    result: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    sender_customer_id: string;
    receiver_customer_id: string;
    amount: number;
    country_origin: "USA" | "India" | "UK" | "Germany" | "France" | "Canada" | "Australia" | "Singapore" | "UAE" | "Brazil";
    country_destination: "USA" | "India" | "UK" | "Germany" | "France" | "Canada" | "Australia" | "Singapore" | "UAE" | "Brazil";
    result: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    sender_customer_id: string;
    receiver_customer_id: string;
    amount: number;
    country_origin: "USA" | "India" | "UK" | "Germany" | "France" | "Canada" | "Australia" | "Singapore" | "UAE" | "Brazil";
    country_destination: "USA" | "India" | "UK" | "Germany" | "France" | "Canada" | "Australia" | "Singapore" | "UAE" | "Brazil";
    result: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default transaction_model;
//# sourceMappingURL=transactions.schema.d.ts.map