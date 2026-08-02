import mongoose from "mongoose";
declare const transaction_model: mongoose.Model<{
    sender_customer_id: string;
    receiver_customer_id: string;
    amount: number;
    country_origin: "Australia" | "Brazil" | "Canada" | "France" | "Germany" | "India" | "Singapore" | "UAE" | "UK" | "USA";
    country_destination: "Australia" | "Brazil" | "Canada" | "France" | "Germany" | "India" | "Singapore" | "UAE" | "UK" | "USA";
    result: string;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    sender_customer_id: string;
    receiver_customer_id: string;
    amount: number;
    country_origin: "Australia" | "Brazil" | "Canada" | "France" | "Germany" | "India" | "Singapore" | "UAE" | "UK" | "USA";
    country_destination: "Australia" | "Brazil" | "Canada" | "France" | "Germany" | "India" | "Singapore" | "UAE" | "UK" | "USA";
    result: string;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    sender_customer_id: string;
    receiver_customer_id: string;
    amount: number;
    country_origin: "Australia" | "Brazil" | "Canada" | "France" | "Germany" | "India" | "Singapore" | "UAE" | "UK" | "USA";
    country_destination: "Australia" | "Brazil" | "Canada" | "France" | "Germany" | "India" | "Singapore" | "UAE" | "UK" | "USA";
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
    country_origin: "Australia" | "Brazil" | "Canada" | "France" | "Germany" | "India" | "Singapore" | "UAE" | "UK" | "USA";
    country_destination: "Australia" | "Brazil" | "Canada" | "France" | "Germany" | "India" | "Singapore" | "UAE" | "UK" | "USA";
    result: string;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    sender_customer_id: string;
    receiver_customer_id: string;
    amount: number;
    country_origin: "Australia" | "Brazil" | "Canada" | "France" | "Germany" | "India" | "Singapore" | "UAE" | "UK" | "USA";
    country_destination: "Australia" | "Brazil" | "Canada" | "France" | "Germany" | "India" | "Singapore" | "UAE" | "UK" | "USA";
    result: string;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    sender_customer_id: string;
    receiver_customer_id: string;
    amount: number;
    country_origin: "Australia" | "Brazil" | "Canada" | "France" | "Germany" | "India" | "Singapore" | "UAE" | "UK" | "USA";
    country_destination: "Australia" | "Brazil" | "Canada" | "France" | "Germany" | "India" | "Singapore" | "UAE" | "UK" | "USA";
    result: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    sender_customer_id: string;
    receiver_customer_id: string;
    amount: number;
    country_origin: "Australia" | "Brazil" | "Canada" | "France" | "Germany" | "India" | "Singapore" | "UAE" | "UK" | "USA";
    country_destination: "Australia" | "Brazil" | "Canada" | "France" | "Germany" | "India" | "Singapore" | "UAE" | "UK" | "USA";
    result: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    sender_customer_id: string;
    receiver_customer_id: string;
    amount: number;
    country_origin: "Australia" | "Brazil" | "Canada" | "France" | "Germany" | "India" | "Singapore" | "UAE" | "UK" | "USA";
    country_destination: "Australia" | "Brazil" | "Canada" | "France" | "Germany" | "India" | "Singapore" | "UAE" | "UK" | "USA";
    result: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default transaction_model;
//# sourceMappingURL=transactions.schema.d.ts.map