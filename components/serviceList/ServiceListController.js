const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const createSchema = require('../auth/schemas/create-service');

const serviceListRepo = require('./ServiceListRepository');
const serviceRepo=require('../services/LaundryService');
const createError = require('http-errors');
const qs = require('qs');
const Paginator = require('paginator');

const ajv = new Ajv();
addFormats(ajv);

class ServiceListController {    
    async list(req, res, next) {
        const { search: nameFilter,
            sort: sortFilter,
            page: currentPage} = req.query;

        let services = [];

        if (nameFilter||sortFilter) {
            services = await serviceListRepo.filter(nameFilter,sortFilter);
        }
        else {
            services = await serviceListRepo.getAll();
        }
        const type=await serviceListRepo.getTypeList();
        const { page, ...withoutSort } = req.query;
        //Render services results
        const countResult = Object.keys(services).length;
        //Paginate results
        const items_per_page = 6;
        const range_paginate = 4;
        var paginator = new Paginator(items_per_page,range_paginate);
        var pagination_info = paginator.build(countResult, currentPage); 
        res.render('admin/service-list', {layout: 'admin-layout', services, 
                                        originalUrl: `${req.baseUrl}/service-list?${qs.stringify(withoutSort)}`, 
                                        countResult, 
                                        pagination_info, 
                                        items_per_page,type});
    };
    async showCreateInfoService (req, res, next){
        res.render('admin/create-info-service',{layout: 'admin-layout'});
    };
    async showEditService (req, res, next){
        const idservice =req.query.idservice;
        const service =await serviceRepo.getService(idservice);
        const imageList=await serviceRepo.getImagelist(idservice);
        
        res.render('admin/edit-service',{layout: 'admin-layout',service,imageList});
    };
    async editService(req,res,next){
        let {   name: nameService,
                price: priceService,
                type: typeService,
                description: descriptionService, 
                imageLink: imageLinkService,
                submit: typeSubmit
                }=req.body;   

        try{
            if (imageLinkService){
                await serviceListRepo.insertImage(imageLinkService,req.query.idservice); 
            }
            if (nameService||typeService||descriptionService||priceService){
                const service =await serviceRepo.getService(req.query.idservice);
                nameService=nameService ? nameService : service.servicename;
                typeService=(typeService!=0)? typeService : service.idtype;
                descriptionService=descriptionService? descriptionService : service.description;
                priceService=priceService? priceService : service.price;

                await serviceListRepo.updateService(req.query.idservice,nameService,typeService,descriptionService,priceService);
                if (typeSubmit=="add"){
                    res.redirect(req.get('referer'));
                } 
                else {
                    res.redirect('/admin/service-list');
                }
            }
        }catch(e){
            res.redirect(`/edit?idservice=${req.query.idservice}`);
            return;
        }
                   
    }
    async showCreateImageService (req, res, next){
        res.render('admin/create-image-service',{layout: 'admin-layout'});
    };
    async createService (req, res){
        const error = "Invalid input! Try again!";
        try{
            let {name,price,type,imageLink,description}=req.body;
            type=(type!=0)?type:1;
            imageLink=imageLink ? imageLink:"null";
            description = description ?description :"No information";
            await serviceListRepo.createService(name,price,type,imageLink,description);
        }catch(e){
            //res.render('/admin/service-list/create-info', {layout:'admin',error });
            res.redirect(req.get('referer'));
            return;
        }
        res.redirect('/admin/service-list/create-image');

    };

    async insertImg(req,res,next){
        const {imageLink}=req.body;
        let service=[]
        try{
            
            service=await serviceListRepo.getMaxID();
            if (await serviceListRepo.checkImageExist(imageLink,service.idservice)){
                res.render('/admin/service-list/create-image', { error: "Image existed" });
                return;
                //throw new Error('Email exists!');
            }
            await serviceListRepo.insertImage(imageLink,service.idservice);
        }catch(e){
            res.render('/admin/service-list/create-image', { error: e.message });
            return;
        }
        res.redirect('/admin/service-list/create-image');
    }

    async deleteService(req, res, next){
        const {idservice}=req.body;
        try{
            await serviceListRepo.deleteService(idservice);
        }catch(e){
            res.render('/admin/service-list', { error: e.message });
            return;
        }
        res.redirect('/admin/service-list');

    }

    async deleteImage(req, res, next){
        const {idservice,image}=req.body;
        try{
            await serviceListRepo.deleteImage(idservice,image);
            res.redirect(`/admin/service-list/edit?idservice=${idservice}`);
            //res.redirect('..');
        }catch(e){
            console.log(e);
        }
    }
}

module.exports = new ServiceListController;