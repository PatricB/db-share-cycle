<?php

namespace AppBundle\Controller;

use Pimcore\Controller\FrontendController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends FrontendController
{

    /**
     * @Template()
     */
    public function defaultAction()
    {
    }
}
