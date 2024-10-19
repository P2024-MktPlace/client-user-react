import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import BASE_API_URL from "../../config";
import { Box, Typography, Button, Divider, Container, Card, CardContent, Grid } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const OrderStatus = () => {
  const location = useLocation();
  const [params, setParams] = useState({});
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [status, setStatus] = useState("NA");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      const queryParams = new URLSearchParams(location.search);
      const token = localStorage.getItem("token");
      const extractedParams = {
        razorpay_payment_id: queryParams.get("razorpay_payment_id"),
        razorpay_payment_link_id: queryParams.get("razorpay_payment_link_id"),
        razorpay_payment_link_reference_id: queryParams.get("razorpay_payment_link_reference_id"),
        razorpay_payment_link_status: queryParams.get("razorpay_payment_link_status"),
        razorpay_signature: queryParams.get("razorpay_signature"),
        ref: queryParams.get("ref"),
        token: token,
      };

      setParams(extractedParams);

      if (!isRequestSent) {
        sendPostRequest(extractedParams);
        setIsRequestSent(true);
      }
    };

    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, [location, isRequestSent]);

  const sendPostRequest = async (data) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/orderstatus`, data);
      setStatus(response.data);
    } catch (error) {
      console.error("Error while sending POST request:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container sx={{ textAlign: "center", marginTop: 5 }}>
      <Card sx={{ borderRadius: 3, padding: 4, boxShadow: 3 }}>
        <CardContent>
          <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "green", marginBottom: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Order Confirmed
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>
            Your order has been successfully placed! You will receive a confirmation email shortly.
            If you have any questions, feel free to reach out to our support team.
          </Typography>

          {/* Order and Transaction Details */}
          <Grid container spacing={2} justifyContent="center" sx={{ marginY: 3 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Order ID:
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {status.orderID || "N/A"}
              </Typography>
            </Grid>

            <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Transaction ID:
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {status.transcationID || "N/A"}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ marginY: 4 }} />

          {/* Additional Note Section */}
          <Typography variant="body1" sx={{ marginBottom: 4, fontStyle: "italic", color: "orange" }}>
            Please take a screenshot of this page for future reference.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 3, padding: "10px 20px", textTransform: "uppercase" }}
            href="/myorders"
          >
            View Order Details
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default OrderStatus;
