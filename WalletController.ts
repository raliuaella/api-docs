  // name, url path
  /// @Controller(WalletController, 'api/WalletController')
  export class WalletFundingController {
   // private serviceName: string;
    constructor() {
      //this.serviceName = this.config.get<string>('SERVICE_NAME');
    }
  
   // (reuestname,httpmethod,url,query,params,body,header)
   /// Method=BankLisiting;GET;'bank-listing')
   /// @Produces([application/json])
   /// Query({pageIndex:1,pageSize:10})
   /// @Description('returns list of banks in the system')
   /// @Folder([Bank, Listing])
    async BankShortCodeListing() {
       // console.log("data returned")
     // return SuccessResponse(res, await this.service.ListBanks(), this.serviceName);
    }
  
    //@Post('ussd-string')
    /// Method=(getUssdString;POST;'ussd-string')
    /// @Consumes([application/json,application/xml])
    /// @Body({amount:5000,userid:454,bankCode:322})
    /// @Params({userid:1})
    /// @Folder([Bank])
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
   /// Method=(GetCustomerDetails;POST;'customer-details')
   /// @Consumes([application/json,application/xml])
   /// @Produces([application/json,text/csv])
   /// @Headers({accept:application/json})
  /// @Body({customerRef:''})
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
  