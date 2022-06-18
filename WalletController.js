"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletFundingController = void 0;
/// Controller=('api/WalletController')
class WalletFundingController {
    // private serviceName: string;
    constructor() {
        //this.serviceName = this.config.get<string>('SERVICE_NAME');
    }
    // (reuestname,httpmethod,url,query,params,body,header)
    /// Method=BankLisiting;GET;'v2/bank-listing')
    /// @Produces([application/json])
    /// Query({pageIndex:1,pageSize:10})
    /// @Description('returns list of banks in the system')
    BankShortCodeListing() {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("data returned")
            // return SuccessResponse(res, await this.service.ListBanks(), this.serviceName);
        });
    }
    //@Post('ussd-string')
    /// Method=(getUssdString;POST;'api/ussd-string')
    /// @Consumes([application/json,application/xml])
    /// @Body({amount:5000,userid:454,bankCode:322})
    /// @Params({userid:1})
    GetUssdString() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('generate ussd-session-string-initiated at' + new Date().toString());
            //   const serviceResponse: any = await this.service.GetUssdString(
            //     body.bankCode,
            //     body.userId,
            //     body.amount,
            //   );
            //   console.log(
            //     `ussd-session-string-initiated generated ${JSON.stringify(
            //       serviceResponse,
            //     )} at` + new Date().toString(),
            //   );
            //   if (serviceResponse == null || serviceResponse == undefined) {
            //     return FailureResponse(
            //       response,
            //       'unable to generate ussd string at the moment',
            //       this.serviceName,
            //     );
            //   }
            //   return SuccessResponse(response, serviceResponse, this.serviceName);
        });
    }
    // @Post('customer-details')
    // @UseGuards(AuthGuard('basic'))
    /// Method=(GetCustomerDetails;POST;'api/customer-details')
    /// @Consumes([application/json,application/xml])
    /// @Produces([application/json,text/csv])
    /// @Headers({accept:application/json})
    /// @Body({customerRef:''})
    GetCustomerDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('get customer details ' + JSON.stringify(body));
            //   const serviceResponse: UserDetailsResponseDTO =
            //     await this.service.GetUserDetails(body.customerRef);
            //   if (serviceResponse == null || serviceResponse == undefined) {
            //     return FailureResponse(
            //       response,
            //       'unable to fetch customer details',
            //       this.serviceName,
            //     );
            //   }
            //   console.log(
            //     'get customer details response' + JSON.stringify(serviceResponse),
            //   );
            //   const customerName = String(
            //     serviceResponse.data.first_name + ' ' + serviceResponse.data.last_name,
            //   );
            //   const responseData: CustomerDetailsResponseDto = {
            //     customerName: customerName,
            //     traceId: serviceResponse.traceId,
            //     amount: serviceResponse.amount,
            //     responseCode: '00',
            //     displayMessage: customerName + ' ' + this.serviceName,
            //   };
            //   return SuccessResponse(response, responseData, this.serviceName);
        });
    }
}
exports.WalletFundingController = WalletFundingController;
