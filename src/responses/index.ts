export const Created = {
    status: "Created",
    message: "Account created! Please verify your email!"
}

export const fetch = (value: string) => {
    return {
        status: "OK",
        message: `${value} fetched successfully!`
    }
}
