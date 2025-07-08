"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  CalendarDays,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  X,
  UserCircle,
  IndianRupee,
} from "lucide-react";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import { ChartContainer } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { MONTHLY_INVESTMENT, MONTHLY_RETURN } from "@/lib/constants";

export default function InvestmentDashboard() {

  
  const withdrawableBalance = 57400;
  const nextDueDate = "6th February 2025";
  const nextDueAmount = 2200;

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showPayNowModal, setShowPayNowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  

  const generateChartData = (numMonths: any) => {
    const data = [];
    for (let i = 0; i < numMonths; i++) {
      const monthIndex = i; // 0 for Jan, 1 for Feb, etc.
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const cumulativeInvested = (i + 1) * MONTHLY_INVESTMENT;
      const cumulativeReturns = (i + 1) * MONTHLY_RETURN;

      data.push({
        month: monthNames[monthIndex % 12], // Cycle through month names
        invested: cumulativeInvested,
        returns: cumulativeReturns,
        colorInvested: "#5D17EB", // Primary Purple
        colorReturns: "#03AC13", // Green for returns
      });
    }
    return data;
  };

  const monthsEnrolled = 7;
  const chartData = generateChartData(monthsEnrolled);

  const currentInvested = chartData[chartData.length - 1]?.invested || 0;
  const currentReturns = chartData[chartData.length - 1]?.returns || 0;

  const totalNetValue = currentInvested + currentReturns;

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center text-center space-y-2">
          <h1
            className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tighter"
            style={{
              backgroundImage: "linear-gradient(45deg, #5D17EB, #8A2BE2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "2px 2px 8px rgba(93, 23, 235, 0.3)",
            }}
          >
            Investor's Dashboard
          </h1>

          <button
            onClick={() => setShowProfileModal(true)}
            className="p-3 rounded-full bg-[#5D17EB] shadow-lg text-white transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <UserCircle className="h-8 w-8" />
          </button>
        </div>

        <WithdrawableDetails
          withdrawableBalance={withdrawableBalance}
          setShowWithdrawModal={setShowWithdrawModal}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MonthsEnrolledCard monthsEnrolled={monthsEnrolled} />
          <AmountInvestedCard currentInvested={currentInvested} />
        </div>

        <InvestmentChart
          currentReturns={currentReturns}
          currentInvested={currentInvested}
          chartData={chartData}
          totalNetValue={totalNetValue}
        />

        <NextPaymentCard
          setShowPayNowModal={setShowPayNowModal}
          nextDueDate={nextDueDate}
          nextDueAmount={nextDueAmount}
        />
      </div>

      <PayNowModal
        isOpen={showPayNowModal}
        onClose={() => setShowPayNowModal(false)}
        nextDueAmount={nextDueAmount}
      />

      <WithdrawModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        withdrawableBalance={withdrawableBalance}
      />

      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </div>
  );
}

const WithdrawableDetails = ({
  withdrawableBalance,
  setShowWithdrawModal,
}: any) => {
  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-[#5D17EB] to-purple-800 text-white transform hover:scale-[1.01] transition-transform duration-300 ease-in-out">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium opacity-90">
              Available for Withdrawal
            </h3>
            <p className="text-3xl font-bold mt-1">
              ₹{withdrawableBalance.toLocaleString("en-IN")}
            </p>
            <p className="text-sm opacity-90 mt-1">Ready to withdraw anytime</p>
          </div>
          <div className="text-right">
            <button
              className="button-style"
              onClick={() => setShowWithdrawModal(true)}
            >
              <IndianRupee
                size={32} // Makes the icon larger (e.g., 32px by 32px)
                strokeWidth={2.5} // Makes the lines thicker (default is 2)
              />

              <div>Withdraw</div>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MonthsEnrolledCard = ({ monthsEnrolled }: any) => {
  return (
    <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-[#E0F2FE] to-blue-100 text-slate-900 transform hover:scale-[1.01] transition-transform duration-300 ease-in-out">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium opacity-90">
            Months Enrolled
          </CardTitle>
          <CalendarDays className="h-5 w-5 opacity-80" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="text-3xl font-bold">{monthsEnrolled}</div>
          <p className="text-sm opacity-90">
            Active since{" "}
            {new Date(
              Date.now() - monthsEnrolled * 30 * 24 * 60 * 60 * 1000
            ).toLocaleDateString("en-IN", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </CardContent>
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#5D17EB]/15 rounded-full -translate-y-16 translate-x-16 blur-xl opacity-70"></div>
    </Card>
  );
};

const AmountInvestedCard = ({ currentInvested }: any) => {
  return (
    <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-[#5D17EB] to-purple-800 text-white transform hover:scale-[1.01] transition-transform duration-300 ease-in-out">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium opacity-90">
            Total Invested
          </CardTitle>
          <Wallet className="h-5 w-5 opacity-80" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="text-3xl font-bold">
            ₹{currentInvested.toLocaleString("en-IN")}
          </div>
          <p className="text-sm opacity-90">₹2,200 per month (average)</p>
        </div>
      </CardContent>
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#E0F2FE]/15 rounded-full -translate-y-16 translate-x-16 blur-xl opacity-70"></div>
    </Card>
  );
};

const InvestmentChart = ({
  currentReturns,
  currentInvested,
  chartData,
  totalNetValue,
}: any) => {
  const chartConfig = {
    invested: {
      label: "Amount Invested (₹)",
      color: "#5D17EB",
    },
    returns: {
      label: "Returns (₹)",
      color: "#03AC13",
    },
  };

  return (
    <Card className="border-0 shadow-lg bg-white transform hover:scale-[1.01] transition-transform duration-300 ease-in-out">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-slate-900">
              Investment Overview
            </CardTitle>
            <CardDescription>
              Your investment growth and returns over time
            </CardDescription>
          </div>
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-[#E0F2FE] to-blue-50 text-[#5D17EB] border-[#5D17EB]/20 font-semibold px-3 py-1 text-sm"
          >
            <TrendingUp className="h-3 w-3 mr-1" />+
            {((currentReturns / currentInvested) * 100).toFixed(0)}% Returns
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barCategoryGap="15%"
            >
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
                        <p className="font-medium text-slate-900">
                          {data.month}
                        </p>
                        <p className="text-sm text-slate-600">
                          Invested:{" "}
                          <span className="font-bold text-[#5D17EB]">
                            ₹{data.invested.toLocaleString("en-IN")}
                          </span>
                        </p>
                        <p className="text-sm text-slate-600">
                          Returns:{" "}
                          <span className="font-bold text-[#03AC13]">
                            ₹{data.returns.toLocaleString("en-IN")}
                          </span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar
                dataKey="invested"
                stackId="a"
                fill={chartConfig.invested.color}
                radius={[8, 8, 0, 0]} // Apply radius only to the top bar of the stack
              />
              <Bar
                dataKey="returns"
                stackId="a"
                fill={chartConfig.returns.color}
                radius={[8, 8, 0, 0]} // Apply radius to the top bar of the stack (returns will now be top)
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200">
          <div className="text-center">
            <p className="text-sm text-slate-600">Monthly Investment</p>
            <p className="text-lg font-semibold text-slate-900">
              ₹{MONTHLY_INVESTMENT.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600">Current Monthly Returns</p>
            <p className="text-lg font-semibold text-green-600">
              ₹{MONTHLY_RETURN.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600">Net Value</p>
            <p className="text-lg font-semibold text-slate-900">
              ₹{totalNetValue.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const NextPaymentCard = ({
  setShowPayNowModal,
  nextDueDate,
  nextDueAmount,
}: any) => {
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-[#E0F2FE] to-blue-100 border-l-4 border-l-[#5D17EB] text-slate-900 transform hover:scale-[1.01] transition-transform duration-300 ease-in-out">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#5D17EB]/10 rounded-lg">
              <CalendarDays className="h-5 w-5 text-[#5D17EB]" />
            </div>
            <div>
              <CardTitle className="text-lg text-slate-900">
                Next Payment Due
              </CardTitle>
              <CardDescription>
                Your upcoming investment installment
              </CardDescription>
            </div>
          </div>
          <button
            className="button-style"
            onClick={() => setShowPayNowModal(true)}
          >
            <Wallet className="h-7 w-7 opacity-90" />
            <div>Pay now</div>
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600">Due Date</p>
            <p className="text-xl font-bold text-slate-900">{nextDueDate}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600">Amount Due</p>
            <p className="text-xl font-bold text-slate-900">
              ₹{nextDueAmount.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600">
              Expected Return
            </p>
            <div className="flex items-center space-x-2">
              <p className="text-xl font-bold text-green-600">
                ₹{MONTHLY_RETURN.toLocaleString("en-IN")}
              </p>
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg border border-[#5D17EB]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">Auto-debit scheduled</p>
              <p className="text-sm text-slate-600">
                Payment will be automatically processed on the due date
              </p>
            </div>
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 font-semibold px-3 py-1"
            >
              Active
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const WithdrawModal = ({
  isOpen,
  onClose,
  withdrawableBalance,
}: any) => {
  const modalRef: any = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in-up"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Withdraw Funds
        </h2>
        <div className="space-y-3 mb-6">
          <p className="text-slate-700">
            <span className="font-medium">
              Amount available for withdrawal:
            </span>{" "}
            <span className="font-bold text-xl text-green-600">
              ₹{withdrawableBalance.toLocaleString("en-IN")}
            </span>
          </p>
          <p className="text-slate-700">
            <span className="font-medium">Estimated processing time:</span>{" "}
            <span className="font-semibold">30-40 Business Days</span>
          </p>
          <p className="text-red-700 font-semibold border border-red-300 bg-red-50 p-3 rounded-md">
            Notice: Withdrawing your entire balance will end your current
            investment scheme.
          </p>
        </div>
        <button className="w-full bg-[#5D17EB] text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:-translate-y-1">
          Confirm Withdrawal
        </button>
      </div>
    </div>
  );
};

const PayNowModal = ({ isOpen, onClose, nextDueAmount }: any) => {
  const modalRef: any = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in-up"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Pay Investment Installment
        </h2>
        <p className="text-slate-700 mb-2">
          Your next investment installment of{" "}
          <span className="font-bold text-xl text-[#5D17EB]">
            ₹{nextDueAmount.toLocaleString("en-IN")}
          </span>{" "}
          is due.
        </p>
        <p className="text-slate-600 text-sm mb-6">
          Please proceed to make the payment.
        </p>
        <button className="w-full bg-[#5D17EB] text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:-translate-y-1">
          Proceed to Pay ₹{nextDueAmount.toLocaleString("en-IN")}
        </button>
      </div>
    </div>
  );
};

const ProfileModal = ({ isOpen, onClose }: any) => {
  const modalRef: any = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        // Changed to solid white background and standard shadow
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in-up text-slate-900"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <UserCircle className="h-10 w-10 text-[#5D17EB]" />
            <div>
              <p className="font-semibold text-lg">John Doe</p>
              <p className="text-sm text-slate-700">john.doe@example.com</p>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-4 space-y-2">
            {" "}
            {/* Adjusted border color */}
            <p className="text-md">
              <span className="font-medium">Member Since:</span> January 2024
            </p>
            <p className="text-md">
              <span className="font-medium">Investment Plan:</span> Premium
            </p>
            <p className="text-md">
              <span className="font-medium">Total Referrals:</span> 5
            </p>
          </div>
          <button className="w-full bg-[#5D17EB] text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:-translate-y-1">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};
