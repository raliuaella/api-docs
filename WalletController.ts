
  /// ControllerName=('api/WalletController')
  export class WalletFundingController {
   // private serviceName: string;
    constructor() {
      //this.serviceName = this.config.get<string>('SERVICE_NAME');
    }
  
   // (reuestname,httpmethod,query,params,body,header)
   /// MethodName=(BankLisiting;GET;'v2/bank-listing';null;null;null,null)
    async BankShortCodeListing() {
       // console.log("data returned")
     // return SuccessResponse(res, await this.service.ListBanks(), this.serviceName);
    }
  
    //@Post('ussd-string')
    /// MethodName=(getUssdString;POST;'api/ussd-string';{};{userid:1};{amount:5000,userid:454,bankCode:322};{})
    async GetUssdString() {
      console.log(
        'generate ussd-session-string-initiated at' + new Date().toString(),
      );
  
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
    }
  
   // @Post('customer-details')
   // @UseGuards(AuthGuard('basic'))
   /// MethodName=(GetCustomerDetails;POST;'api/customer-details';{};{};{};null)
    async GetCustomerDetails() {
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
    }
  }
  