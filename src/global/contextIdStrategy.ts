import {
    HostComponentInfo,
    ContextId,
    ContextIdFactory,
    ContextIdStrategy,
  } from '@nestjs/core';
  import { Request } from 'express';
  
  const tenants = new Map<string, ContextId>();
  /**
   * This strategy is used to aggregate contextId by tenantId
   */
  export class AggregateByTenantContextIdStrategy implements ContextIdStrategy {
    attach(contextId: ContextId, request: Request) {
      const tenantId = request.headers['x-tenant-id'] as string;
      let tenantSubTreeId: ContextId;
  
      if (tenants.has(tenantId)) {
     
        tenantSubTreeId = tenants.get(tenantId) as ContextId;
        console.log('tenantId found', tenantSubTreeId)
      } else {
        console.log('tenantId not found', tenantId)
        tenantSubTreeId = ContextIdFactory.create();
        tenants.set(tenantId, tenantSubTreeId);
      }
  
      // If tree is not durable, return the original "contextId" object
      return (info: HostComponentInfo) =>
        info.isTreeDurable ? tenantSubTreeId : contextId;
    }
  }